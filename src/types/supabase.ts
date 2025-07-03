export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          timezone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          timezone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          timezone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          start_time: string
          end_time: string
          location: string | null
          latitude: number | null
          longitude: number | null
          created_by: string
          is_public: boolean
          max_participants: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          start_time: string
          end_time: string
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          created_by: string
          is_public?: boolean
          max_participants?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          created_by?: string
          is_public?: boolean
          max_participants?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      event_participants: {
        Row: {
          id: string
          event_id: string
          user_id: string
          status: 'going' | 'maybe' | 'not_going'
          rsvp_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          status?: 'going' | 'maybe' | 'not_going'
          rsvp_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          status?: 'going' | 'maybe' | 'not_going'
          rsvp_at?: string | null
          created_at?: string
        }
      }
      polls: {
        Row: {
          id: string
          event_id: string
          question: string
          poll_type: 'single' | 'multiple'
          options: Json
          created_by: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          question: string
          poll_type?: 'single' | 'multiple'
          options: Json
          created_by: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          question?: string
          poll_type?: 'single' | 'multiple'
          options?: Json
          created_by?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      poll_votes: {
        Row: {
          id: string
          poll_id: string
          user_id: string
          selected_options: Json
          created_at: string
        }
        Insert: {
          id?: string
          poll_id: string
          user_id: string
          selected_options: Json
          created_at?: string
        }
        Update: {
          id?: string
          poll_id?: string
          user_id?: string
          selected_options?: Json
          created_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          event_id: string
          title: string
          amount: number
          currency: string
          paid_by: string
          split_type: 'equal' | 'percentage' | 'custom'
          split_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          title: string
          amount: number
          currency?: string
          paid_by: string
          split_type?: 'equal' | 'percentage' | 'custom'
          split_data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          title?: string
          amount?: number
          currency?: string
          paid_by?: string
          split_type?: 'equal' | 'percentage' | 'custom'
          split_data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_availability: {
        Row: {
          id: string
          user_id: string
          status: 'free' | 'busy' | 'maybe'
          start_time: string | null
          end_time: string | null
          message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'free' | 'busy' | 'maybe'
          start_time?: string | null
          end_time?: string | null
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'free' | 'busy' | 'maybe'
          start_time?: string | null
          end_time?: string | null
          message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      friends: {
        Row: {
          id: string
          user_id: string
          friend_id: string
          status: 'pending' | 'accepted' | 'blocked'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          friend_id: string
          status?: 'pending' | 'accepted' | 'blocked'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          friend_id?: string
          status?: 'pending' | 'accepted' | 'blocked'
          created_at?: string
          updated_at?: string
        }
      }
      calendar_integrations: {
        Row: {
          id: string
          user_id: string
          provider: 'google' | 'apple' | 'outlook'
          access_token: string
          refresh_token: string | null
          calendar_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: 'google' | 'apple' | 'outlook'
          access_token: string
          refresh_token?: string | null
          calendar_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: 'google' | 'apple' | 'outlook'
          access_token?: string
          refresh_token?: string | null
          calendar_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 