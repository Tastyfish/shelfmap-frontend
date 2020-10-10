import Vue from 'vue'
import Vuex from 'vuex'
import { readSiteInfo, updateSiteInfo, SiteInfo } from '@/api/backend/site'
import { readCurrentUser } from '@/api/backend/user'

Vue.use(Vuex)

interface StoreState {
  email?: string;
  jwt?: string;

  siteName?: string;
  accountCreationEnabled: boolean;
  mapImageName?: string;
}

interface TileInfo {
  x: number;
  y: number;
  z: number;
  tile: Blob;
}

interface CleanSiteInfo {
  siteName?: string;
  accountCreationEnabled?: boolean;
  mapImageName?: string;
}

export default new Vuex.Store<StoreState>({
  state: {
    email: undefined,
    jwt: undefined,

    siteName: undefined,
    accountCreationEnabled: false,
    mapImageName: undefined
  },
  getters: {
    signedIn: state => !!state.email
  },
  mutations: {
    setSiteName (state, value: string) {
      state.siteName = value
    },
    setAccountCreationEnabled (state, value: boolean) {
      state.accountCreationEnabled = value
    },
    setMapImageMeta (state, image: { name: string }) {
      state.mapImageName = image.name
    },
    setMapImageTile (state, { x, y, z, tile }: TileInfo) {
      console.log(`tile: ${x}, ${y}, ${z}: ${tile}`)
    },
    signin (state, { email, jwt }: { email: string; jwt: string }) {
      state.email = email
      state.jwt = jwt
      localStorage.setItem('jwt', jwt)
    },
    signout (state) {
      state.email = undefined
      state.jwt = undefined
      localStorage.removeItem('jwt')
    }
  },
  actions: {
    setSiteInfoSync ({ commit }, { siteName, accountCreationEnabled, mapImageName }: CleanSiteInfo): Promise<void> {
      // Actually update site name on server
      /* eslint-disable @typescript-eslint/camelcase */
      return updateSiteInfo({ site_name: siteName, 'account_creation_enabled?': accountCreationEnabled, map_name: mapImageName })
        .then(() => {
          if (siteName) {
            commit('setSiteName', siteName)
          }
          if (accountCreationEnabled) {
            commit('setAccountCreationEnabled', accountCreationEnabled)
          }
          if (mapImageName) {
            commit('setMapImageMeta', mapImageName)
          }
        })
    },
    resync ({ commit, state }): Promise<SiteInfo> {
      return readSiteInfo()
        .then(site => {
          commit('setSiteName', site.site_name)
          commit('setAccountCreationEnabled', site['account_creation_enabled?'])
          commit('setMapImageMeta', { name: site.map_name })

          if (localStorage.getItem('jwt')) {
            commit('signin', { email: undefined, jwt: localStorage.getItem('jwt') })
            readCurrentUser()
              .then(user => {
                commit('signin', { email: user.email, jwt: state.jwt })
              })
          }

          return site
        })
    }
  },
  modules: {
  }
})
