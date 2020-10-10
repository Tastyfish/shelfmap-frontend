<template>
  <v-container style="max-width: 600px; margin: auto">
    <v-row>
      <v-col align="center">
        <div class="text-h2">You've signed out.</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn block color="primary" :to="{name: 'map'}">Return to map</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import store from '@/store'
import { signOut } from '@/api/backend/user'

@Component({
  store
})
export default class Signin extends Vue {
  mounted (): void {
    signOut().then(() => this.$store.commit('signout'))
  }
}
</script>
