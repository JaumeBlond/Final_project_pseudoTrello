import { supabase } from '@/api/supabase'

export const fetchAllTasks = async (user) => {
  const { data, error } = await supabase.from('tasks').select().eq('user_id', user)

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const createNewTask = async (task) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...task })
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data[0]
}

export const removeTaskById = async (taskId) => {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId)

  if (error) {
    throw new Error(error.message)
  }
}

export const updateTaskById = async (taskId, task) => {
  const { error } = await supabase
    .from('tasks')
    .update({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      updated_at: new Date().toISOString().toLocaleString('zh-TW')
    })
    .eq('id', taskId)

  if (error) {
    throw new Error(error.message)
  }
}

export const updateTaskStatusById = async (taskId, taskStatus) => {
  const { error } = await supabase
    .from('tasks')
    .update({
      status: taskStatus,
      updated_at: new Date().toISOString().toLocaleString('zh-TW')
    })
    .eq('id', taskId)

  if (error) {
    throw new Error(error.message)
  }
}
