import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kxdrvypbrgprmamapgfb.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE;
export const supabase = createClient(supabaseUrl, supabaseKey)
