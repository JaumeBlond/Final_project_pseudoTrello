import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kxdrvypbrgprmamapgfb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4ZHJ2eXBicmdwcm1hbWFwZ2ZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjI0Njk2NSwiZXhwIjoyMDI3ODIyOTY1fQ.EstCsP3I-PcRnRvXn23I1Eh6iL5i8ahNynCvplgXK8M";
export const supabase = createClient(supabaseUrl, supabaseKey);
