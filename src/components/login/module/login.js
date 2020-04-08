const state = {
  user: null,
  token: null
}

const mutations = {
  'login/USER_LOGIN': (currentState, {user, token}) => {
    currentState.user = user
    currentState.token = token
  }
}

const loginAction = ({commit}, {user, token}) => {
  commit('login/USER_LOGIN', {user, token})
}

export default {
  state,
  mutations,
  actions: {
    loginAction
  }
}
