<template>
  <v-dialog v-model="open" :persistent="true" max-width="500px">
    <v-card>
      <v-card-title>
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="username"
          name="username"
          label="Nom d'utilisateur"
          id="username">
        </v-text-field>
      </v-card-text>
      <v-card-text>
        <v-text-field
          v-model="password"
          name="password"
          label="Mot de passe"
          id="password"
          :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (hidePassword = !hidePassword)"
          :type="hidePassword ? 'password' : 'text'">
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn flat @click.native="login">Se connecter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>

</style>

<script>
import { mapActions } from 'vuex'
import { getAccessToken } from '@/services/auth'
import router from '@/router'

export default {
  data () {
    return {
      open: false,
      hidePassword: true,
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['loginAction', 'getMyGroupAction']),
    login () {
      getAccessToken(this.username, this.password)
        .then(token => { this.$localStorage.set('auth_token', token.token) })
        .then(() => {
          router.push('/')
        })
    }

  },
  mounted () {
    if (this.$jwt.hasToken()) {
      this.open = false
      router.push('/')
    } else {
      this.open = true
    }
  }
}
</script>

