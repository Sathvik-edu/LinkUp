-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_status AS ENUM ('free', 'busy', 'maybe');
CREATE TYPE rsvp_status AS ENUM ('going', 'maybe', 'not_going');
CREATE TYPE poll_type AS ENUM ('single', 'multiple');
CREATE TYPE split_type AS ENUM ('equal', 'percentage', 'custom');
CREATE TYPE friend_status AS ENUM ('pending', 'accepted', 'blocked');
CREATE TYPE calendar_provider AS ENUM ('google', 'apple', 'outlook');

-- Profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    timezone TEXT DEFAULT 'UTC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    is_public BOOLEAN DEFAULT false,
    max_participants INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event participants table
CREATE TABLE event_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    status rsvp_status DEFAULT 'maybe',
    rsvp_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Polls table
CREATE TABLE polls (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
    question TEXT NOT NULL,
    poll_type poll_type DEFAULT 'single',
    options JSONB NOT NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Poll votes table
CREATE TABLE poll_votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    poll_id UUID REFERENCES polls(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    selected_options JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(poll_id, user_id)
);

-- Expenses table
CREATE TABLE expenses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    paid_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    split_type split_type DEFAULT 'equal',
    split_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User availability table
CREATE TABLE user_availability (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    status user_status DEFAULT 'free',
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Friends table
CREATE TABLE friends (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    friend_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    status friend_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, friend_id)
);

-- Calendar integrations table
CREATE TABLE calendar_integrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    provider calendar_provider NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    calendar_id TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, provider)
);

-- Create indexes for better performance
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_is_public ON events(is_public);
CREATE INDEX idx_event_participants_event_id ON event_participants(event_id);
CREATE INDEX idx_event_participants_user_id ON event_participants(user_id);
CREATE INDEX idx_polls_event_id ON polls(event_id);
CREATE INDEX idx_polls_is_active ON polls(is_active);
CREATE INDEX idx_poll_votes_poll_id ON poll_votes(poll_id);
CREATE INDEX idx_expenses_event_id ON expenses(event_id);
CREATE INDEX idx_user_availability_user_id ON user_availability(user_id);
CREATE INDEX idx_friends_user_id ON friends(user_id);
CREATE INDEX idx_friends_friend_id ON friends(friend_id);
CREATE INDEX idx_calendar_integrations_user_id ON calendar_integrations(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_polls_updated_at BEFORE UPDATE ON polls FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_availability_updated_at BEFORE UPDATE ON user_availability FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_friends_updated_at BEFORE UPDATE ON friends FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_calendar_integrations_updated_at BEFORE UPDATE ON calendar_integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create profile trigger on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_integrations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Events policies
CREATE POLICY "Users can view public events" ON events FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view events they created" ON events FOR SELECT USING (auth.uid() = created_by);
CREATE POLICY "Users can view events they're participating in" ON events FOR SELECT USING (
    EXISTS (SELECT 1 FROM event_participants WHERE event_id = events.id AND user_id = auth.uid())
);
CREATE POLICY "Users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update events they created" ON events FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Users can delete events they created" ON events FOR DELETE USING (auth.uid() = created_by);

-- Event participants policies
CREATE POLICY "Users can view participants of events they can see" ON event_participants FOR SELECT USING (
    EXISTS (SELECT 1 FROM events WHERE id = event_participants.event_id AND (
        is_public = true OR 
        created_by = auth.uid() OR 
        EXISTS (SELECT 1 FROM event_participants ep2 WHERE ep2.event_id = events.id AND ep2.user_id = auth.uid())
    ))
);
CREATE POLICY "Users can manage their own participation" ON event_participants FOR ALL USING (auth.uid() = user_id);

-- Polls policies
CREATE POLICY "Users can view polls for events they can see" ON polls FOR SELECT USING (
    EXISTS (SELECT 1 FROM events WHERE id = polls.event_id AND (
        is_public = true OR 
        created_by = auth.uid() OR 
        EXISTS (SELECT 1 FROM event_participants WHERE event_id = events.id AND user_id = auth.uid())
    ))
);
CREATE POLICY "Users can create polls for events they can see" ON polls FOR INSERT WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (SELECT 1 FROM events WHERE id = polls.event_id AND (
        created_by = auth.uid() OR 
        EXISTS (SELECT 1 FROM event_participants WHERE event_id = events.id AND user_id = auth.uid())
    ))
);
CREATE POLICY "Users can update polls they created" ON polls FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Users can delete polls they created" ON polls FOR DELETE USING (auth.uid() = created_by);

-- Poll votes policies
CREATE POLICY "Users can view votes for polls they can see" ON poll_votes FOR SELECT USING (
    EXISTS (SELECT 1 FROM polls WHERE id = poll_votes.poll_id AND (
        EXISTS (SELECT 1 FROM events WHERE id = polls.event_id AND (
            is_public = true OR 
            created_by = auth.uid() OR 
            EXISTS (SELECT 1 FROM event_participants WHERE event_id = events.id AND user_id = auth.uid())
        ))
    ))
);
CREATE POLICY "Users can manage their own votes" ON poll_votes FOR ALL USING (auth.uid() = user_id);

-- Expenses policies
CREATE POLICY "Users can view expenses for events they can see" ON expenses FOR SELECT USING (
    EXISTS (SELECT 1 FROM events WHERE id = expenses.event_id AND (
        is_public = true OR 
        created_by = auth.uid() OR 
        EXISTS (SELECT 1 FROM event_participants WHERE event_id = events.id AND user_id = auth.uid())
    ))
);
CREATE POLICY "Users can create expenses for events they can see" ON expenses FOR INSERT WITH CHECK (
    auth.uid() = paid_by AND
    EXISTS (SELECT 1 FROM events WHERE id = expenses.event_id AND (
        created_by = auth.uid() OR 
        EXISTS (SELECT 1 FROM event_participants WHERE event_id = events.id AND user_id = auth.uid())
    ))
);
CREATE POLICY "Users can update expenses they paid for" ON expenses FOR UPDATE USING (auth.uid() = paid_by);
CREATE POLICY "Users can delete expenses they paid for" ON expenses FOR DELETE USING (auth.uid() = paid_by);

-- User availability policies
CREATE POLICY "Users can view all availability" ON user_availability FOR SELECT USING (true);
CREATE POLICY "Users can manage their own availability" ON user_availability FOR ALL USING (auth.uid() = user_id);

-- Friends policies
CREATE POLICY "Users can view their own friend relationships" ON friends FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY "Users can manage their own friend relationships" ON friends FOR ALL USING (auth.uid() = user_id);

-- Calendar integrations policies
CREATE POLICY "Users can manage their own calendar integrations" ON calendar_integrations FOR ALL USING (auth.uid() = user_id);

-- Create functions for common operations
CREATE OR REPLACE FUNCTION get_user_events(user_uuid UUID)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    location TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_by UUID,
    is_public BOOLEAN,
    max_participants INTEGER,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT e.*
    FROM events e
    WHERE e.created_by = user_uuid
       OR e.is_public = true
       OR EXISTS (
           SELECT 1 FROM event_participants ep
           WHERE ep.event_id = e.id AND ep.user_id = user_uuid
       )
    ORDER BY e.start_time ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get event participants with profile info
CREATE OR REPLACE FUNCTION get_event_participants(event_uuid UUID)
RETURNS TABLE (
    user_id UUID,
    full_name TEXT,
    avatar_url TEXT,
    status rsvp_status,
    rsvp_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ep.user_id,
        p.full_name,
        p.avatar_url,
        ep.status,
        ep.rsvp_at
    FROM event_participants ep
    JOIN profiles p ON ep.user_id = p.id
    WHERE ep.event_id = event_uuid
    ORDER BY ep.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 