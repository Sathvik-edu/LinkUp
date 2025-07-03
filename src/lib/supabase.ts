import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

// Only create client if we have valid environment variables
const createSupabaseClient = () => {
  if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder_key') {
    console.warn('Supabase environment variables not configured. Using placeholder client.')
    return null
  }
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  })
}

export const supabase = createSupabaseClient()

// Auth helpers
export const getSession = async () => {
  if (!supabase) return null
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export const getUser = async () => {
  if (!supabase) return null
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const signOut = async () => {
  if (!supabase) return { error: new Error('Supabase not configured') }
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Real-time subscriptions
export const subscribeToEvents = (userId: string, callback: (payload: any) => void) => {
  if (!supabase) return null
  return supabase
    .channel('events')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'events',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe()
}

export const subscribeToPolls = (eventId: string, callback: (payload: any) => void) => {
  if (!supabase) return null
  return supabase
    .channel('polls')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'polls',
        filter: `event_id=eq.${eventId}`
      },
      callback
    )
    .subscribe()
}

export const subscribeToAvailability = (callback: (payload: any) => void) => {
  if (!supabase) return null
  return supabase
    .channel('availability')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_availability'
      },
      callback
    )
    .subscribe()
} 