<template>
  <Leaflet tile-path="/tiles/{z}/{x}.{y}.png" style="height: 100%;" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Leaflet from '@/components/Leaflet.vue'

@Component({
  components: {
    Leaflet
  }
})
export default class Map extends Vue {

}
</script>
