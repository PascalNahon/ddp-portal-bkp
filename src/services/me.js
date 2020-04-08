import Vue from 'vue'

export const getMyGroups = () => {
  return Vue.axios.get('/portal/me/groups').then(response => {
    return response.data
  })
}
