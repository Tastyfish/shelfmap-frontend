import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    }
  },
  actions: {
  },
  modules: {
  }
})
