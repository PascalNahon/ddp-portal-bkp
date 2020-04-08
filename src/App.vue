<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      dense
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-select
            v-if="teams.length > 0"
            :items="teams"
            item-text="name"
            v-model="team"
            label="My teams"
            single-line
            solo
            class="select-toolbar"
      ></v-select>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-if="userLogin">
        <v-btn flat><v-icon>account_circle</v-icon>{{userLogin}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
        <router-view/>
    </v-content>
  </v-app>
</template>

<style scoped>
  .select-toolbar {
    border-radius: 0px !important;
    border: none !important;
    background: transparent !important;
    box-shadow: none;
  }
</style>


<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      team: null,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      title: 'DDP - Portal'
    }
  },
  name: 'App',
  methods: {
    ...mapActions(['selectGroupAction'])
  },
  computed: {
    ...mapState({
      teams: state => state.me.groups,
      userLogin: state => {
        if (state.login.user) {
          return state.login.user
        }
      }
    })
  },
  watch: {
    teams () {
      if (this.teams.length > 0) {
        this.team = this.teams[0]
      }
    },

    team () {
      this.selectGroupAction(this.team)
    }
  }
}
</script>
