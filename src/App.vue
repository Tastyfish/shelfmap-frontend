<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Shelfmap
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $store.state.siteName }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list dense nav>
        <template v-for="(item, index) in navItems">
          <v-list-item link exact :key="index" v-if="item.title" :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index" v-else-if="item.divider" />
          <v-subheader :key="index" v-else-if="item.header">
            {{ item.header }}
          </v-subheader>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <transition name="fade-ps" mode="out-in">
        <v-autocomplete light hide-details solo rounded dense class="mx-3"
          label="Find a product..." v-if="productSelectionEnabled" />
        <v-toolbar-title dark class="flex-grow-1" v-else>Shelfmap&mdash;{{ $store.state.siteName }}</v-toolbar-title>
      </transition>

      <v-menu offset-y nudge-bottom="8">
        <template #activator="{ on, attrs }">
          <v-btn
            fab color="secondary" small elevation="1"
            v-bind="attrs"
            v-on="on"
            :title="$store.state.email"
          >
            {{ $store.state.email.substring(0, 2) }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in $store.state.signedIn ? signedInItems : signedOutItems"
            :key="index"
            link
            :to="item.to"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main app>
      <router-view></router-view>
    </v-main>

    <v-dialog v-model="newapp" width="500">
      <v-card>
        <v-card-title>
          Work in Progress
        </v-card-title>

        <v-card-text>
          Most features do not work in this app yet.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text
            @click='newapp = false'
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import store from '@/store'

export default Vue.extend({
  name: 'App',
  store,

  data: () => ({
    drawer: false,
    navItems: [
      { title: 'Product Finder', icon: 'mdi-map', to: '/' },
      { title: 'About', icon: 'mdi-information', to: '/about' },
      { divider: true },
      { header: 'Admin' },
      { title: 'Site Setup', icon: 'mdi-tune', to: '/admin' },
      { title: 'Shelves', icon: 'mdi-bookshelf', to: '/admin/shelf' },
      { title: 'Products', icon: 'mdi-package', to: '/admin/product' }
    ],
    signedOutItems: [
      { title: 'Sign in', to: '/signin' }
    ],
    signedInItems: [
      { title: 'Sign out', to: '/signout' }
    ],
    productSelectionEnabled: false,
    newapp: localStorage.getItem('app--hide-new-app') !== 'true'
  }),

  methods: {
    popAvatar (): void {
      alert('hi')
    },
    updateProductSelection (to: Route): void {
      // Update product selection based on route meta value
      this.productSelectionEnabled =
        to.matched.some(record => record.meta.productSelectionEnabled)
    }
  },

  mounted () {
    this.updateProductSelection(this.$route)
  },

  watch: {
    $route (to: Route) {
      this.updateProductSelection(to)
    },
    newapp (value: boolean) {
      localStorage.setItem('app--hide-new-app', (!value).toString())
    }
  }
})
</script>

<style>
html {
  overflow-y: hidden !important;
}

.fade-ps-enter-active, .fade-ps-leave-active {
  transition: all 0.25s ease;
}

.fade-ps-enter, .fade-ps-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
