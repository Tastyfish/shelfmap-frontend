<!-- Weap a leaflet element in Vue that supports a tile map and pins. -->

<template>
  <div ref="map" />
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import L, { LatLngBounds, Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'

export interface MapPin {
  icon: string;
  title: string;
  x: number;
  y: number;
}

interface LeafletData {
  map: Map | null;
}

@Component({
})
export default class Leaflet extends Vue {
  private map: Map | null = null

  @Prop({ required: true }) readonly tilePath!: string
  @Prop({ default: () => [] }) readonly icons!: MapPin[]
  @Prop() readonly bounds?: LatLngBounds

  initMap (): void {
    this.map = L.map(this.$refs.map as HTMLElement, { attributionControl: false }).setView([51.505, -0.09], 13)
  }

  mounted () {
    this.initMap()
  }
}
</script>

<style lang="scss">
.leaflet-top, .leaflet-bottom {
  z-index: 5;
}
</style>
