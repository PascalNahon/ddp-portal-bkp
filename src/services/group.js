import Vue from 'vue'

export const addGroup = (group) => {
  return Vue.axios.post('/portal/groups', group).then(response => {
    return response.data
  })
}
