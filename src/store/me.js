import { getMyGroups } from '@/services/me'

const state = {
  groups: [],
  selectedGroup: null
}

const mutations = {
  'me/MY_GROUPS': (currentState, groups) => {
    currentState.groups = groups
  },
  'me/SELECTED_GROUP': (currentState, selectedGroup) => {
    currentState.selectedGroup = selectedGroup
  }
}

const getMyGroupAction = ({commit}) => {
  getMyGroups().then(groups => {
    commit('me/MY_GROUPS', groups)
  })
}

const selectGroupAction = ({commit}, selectedGroup) => {
  commit('me/SELECTED_GROUP', selectedGroup)
}

export default {
  state,
  mutations,
  actions: {
    getMyGroupAction,
    selectGroupAction
  }
}
