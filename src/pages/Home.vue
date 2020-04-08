<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout>
        <v-flex>
          <v-card v-if="selectedGroup">
            <v-card-title>{{ selectedGroup.name }}</v-card-title>
            <v-card-text>Ici des infos sur le groupe</v-card-text>
          </v-card>
          <v-card class="mt-1">
            <v-card-actions>
              <v-btn flat @click.native="addDialog = !addDialog">Ajouter un groupe</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-dialog v-model="addDialog" max-width="500px">
          <v-card>
            <v-card-title>
              Ajouter un groupe
            </v-card-title>
            <v-card-text>
              <v-text-field v-model="groupName" name="group-name" label="Nom du groupe" id="group-name"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn flat @click.native="addGroup">Valider</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<script>

import { mapState, mapActions } from 'vuex'
import { addGroup } from '@/services/group'

export default {
  data () {
    return {
      addDialog: false,
      groupName: ''
    }
  },
  computed: {
    ...mapState({
      userLogin: state => state.login.user.login,
      selectedGroup: state => state.me.selectedGroup
    })
  },
  methods: {
    ...mapActions(['getMyGroupAction', 'getMyGroupAction']),
    addGroup () {
      const group = {
        group: {
          name: this.groupName
        },
        user: this.userLogin
      }
      addGroup(group)
        .then(() => {
          this.addDialog = !this.addDialog
          this.groupName = ''
        })
        .then(() => this.getMyGroupAction())
    }
  },
  mounted () {
    if (this.$jwt.hasToken()) {
      this.getMyGroupAction()
    }
  }
}
</script>
