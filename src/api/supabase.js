import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kxdrvypbrgprmamapgfb.supabase.co";
const supabaseKey = "";
export const supabase = createClient(supabaseUrl, supabaseKey);
