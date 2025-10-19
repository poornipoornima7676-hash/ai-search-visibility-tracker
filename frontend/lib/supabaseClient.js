import { createClient } from '@supabase/supabase-js'

// 🔑 Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://kkqywsisqscabqwbnirj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcXl3c2lzcXNjYWJxd2JuaXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODg3NjcsImV4cCI6MjA3NjE2NDc2N30.Vlj8V1snr6bDBimtwjZwc7D_uTgiqgOOxI2bq42UqxU'

// Create a single Supabase client for your app
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
