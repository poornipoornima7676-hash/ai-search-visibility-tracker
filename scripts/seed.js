import { createClient } from '@supabase/supabase-js'

// Replace these with your Supabase credentials
const SUPABASE_URL = 'https://kkqywsisqscabqwbnirj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcXl3c2lzcXNjYWJxd2JuaXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODg3NjcsImV4cCI6MjA3NjE2NDc2N30.Vlj8V1snr6bDBimtwjZwc7D_uTgiqgOOxI2bq42UqxU'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function seed() {
  console.log("🌱 Seed started")

  // Insert a user
  const { data: user, error: userError } = await supabase
    .from('users')
    .insert([{ name: 'Poorni Gowda', email: 'poorni2@example.com' }])
    .select()
    .single()

  if (userError) {
    console.error("Error inserting user:", userError)
    return
  }

  console.log("✅ User inserted:", user)

  // Insert websites
  const { data: websites, error: websiteError } = await supabase
    .from('websites')
    .insert([
      { user_id: user.id, name: 'OpenAI', url: 'https://openai.com' },
      { user_id: user.id, name: 'Supabase', url: 'https://supabase.com' }
    ])
    .select()

  if (websiteError) {
    console.error("Error inserting websites:", websiteError)
    return
  }

  console.log("✅ Websites inserted:", websites)

  // Insert keywords
  const { data: keywords, error: keywordError } = await supabase
    .from('keywords')
    .insert([
      { website_id: websites[0].id, keyword: 'AI assistant' },
      { website_id: websites[1].id, keyword: 'database hosting' }
    ])
    .select()

  if (keywordError) {
    console.error("Error inserting keywords:", keywordError)
    return
  }

  console.log("✅ Keywords inserted:", keywords)

  // Insert visibility data
  const { error: visError } = await supabase
    .from('visibility_checks')
    .insert([
      { keyword_id: keywords[0].id, ai_engine: 'ChatGPT', visible: true, visibility_score: 95 },
      { keyword_id: keywords[1].id, ai_engine: 'Gemini', visible: false, visibility_score: 45 }
    ])

  if (visError) {
    console.error("Error inserting visibility data:", visError)
    return
  }

  console.log("✅ Visibility data inserted")
  console.log("🌿 Seed finished")
}

seed()
