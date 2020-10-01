import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: localStorage.email ?? 'guest',
    signedIn: localStorage.authSignedIn === 'true' || false,
    csrfToken: localStorage.authCSRF,

    siteName: 'Untitled',
    mapImageName: 'blank.png'
  },
  mutations: {
    setSiteName (state, value) {
      state.siteName = value
    },
    setMapImageMeta (state, image) {
      state.mapImageName = image.name

      const imagePromise = createImageBitmap(image)
    },
    setMapImageTile (state, { x, y, z, tile }) {
      console.log(`tile: ${x}, ${y}, ${z}`)
    },
    signin (state, { email, csrf }) {
      state.email = email
      state.signedIn = true
      state.csrfToken = csrf
      localStorage.email = email
      localStorage.authSignedIn = true
      localStorage.authCSRF = csrf
    },
    signout (state) {
      state.email = 'guest'
      state.signedIn = false
      state.csrfToken = null
      delete localStorage.email
      delete localStorage.authSignedIn
      delete localStorage.authCSRF
    }
  },
  actions: {
  },
  modules: {
  }
})
