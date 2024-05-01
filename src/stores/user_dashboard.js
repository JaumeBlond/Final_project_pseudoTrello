// store/modules/user_dashboard.js

import { supabase } from './plugins/supabase' // Import the Supabase client instance

export default {
  namespaced: true,
  state: {
    boards: []
  },
  mutations: {
    setBoards(state, boards) {
      state.boards = boards
    }
  },
  actions: {
    async fetchBoards({ commit, rootState }) {
      const userId = rootState.user.id // Assuming you have the user's ID stored in the user module/state
      try {
        const { data: hasAccessEntries, error: accessError } = await supabase
          .from('has_access')
          .select('board_id')
          .eq('user_id', userId)

        if (accessError) {
          throw accessError
        }

        const boardIds = hasAccessEntries.map((entry) => entry.board_id)

        const { data: boards, error: boardsError } = await supabase
          .from('boards')
          .select('*')
          .in('id', boardIds)

        if (boardsError) {
          throw boardsError
        }

        commit('setBoards', boards)
      } catch (error) {
        console.error('Error fetching boards:', error.message)
      }
    }
  }
}
