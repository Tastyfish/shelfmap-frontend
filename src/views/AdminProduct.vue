<template>
  <div style="height: 100%;">
    <Leaflet tile-path="/tiles/{z}/{x}.{y}.png" style="height: 100%;" />
    <v-fab-transition>
      <v-btn absolute fab bottom right class="add-button" color="primary">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Leaflet from '@/components/Leaflet.vue'

@Component({
  components: {
    Leaflet
  }
})
export default class AdminShelf extends Vue {

}
</script>

<style scoped>
.add-button {
  right: 32px !important;
  bottom: 32px !important;
}
</style>
