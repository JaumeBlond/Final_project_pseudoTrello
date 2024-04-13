import { supabase } from "@/api/supabase";

export const fetchAllTasks = async (user) => {
  console.log(user)
  const { data, error } =
  await supabase.from('tasks').select().eq('user_id', user)
          
  if (error) {
    throw new Error(error.message);
  }
  console.log(data)
  return data;
};
