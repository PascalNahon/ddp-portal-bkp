import Vue from 'vue'

export const getAccessToken = (username, password) => {
  const url = `/auth/login?username=${username}&password=${password}`

  return Vue.axios.get(url).then(response => {
    return response.data
  })
}
