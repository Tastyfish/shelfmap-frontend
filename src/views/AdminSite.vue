<template>
  <div style="max-width: 600px; margin: auto">
    <v-container>
      <v-row>
        <v-col align="center">
          <div class="text-h2">Site Setup</div>
        </v-col>
      </v-row>
    </v-container>
    <v-form cols="2"
      ref="form" v-model="valid"
    >
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field :counter="15" label="Site name"
              v-model="name"
              :rules="nameRules"
              required
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-file-input label="Map image" prepend-icon="mdi-map" show-size
              v-model="mapImage"
              accept="image/png, image/jpeg, image/bmp"
              :placeholder="$store.state.mapImageName"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn type="submit" color="primary" block
              :disabled="!valid"
              @click.prevent="submit"
            >
              Update
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container class="pt-0">
      <v-row class="pt-0">
        <v-col class="pt-0">
          <div class="text-caption">Statistics</div>
          <div class="text-body-1">Shelves: 0</div>
          <div class="text-body-1">Products: 0</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-dialog v-model="deleteSiteDialog" width="500">
            <template #activator="{ on, attrs }">
              <v-btn color="secondary" block
                v-bind="attrs" v-on="on"
              >
                Delete site data
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                Delete site data?
              </v-card-title>

              <v-card-text>
                Are you sure you want to delete all shelves and products?
                This can't be undone.
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text
                  @click='deleteSiteDialog = false'
                >
                  Cancel
                </v-btn>
                <v-btn color="secondary" text
                  @click='deleteSite'
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="updateSnackbar" color="success">
      <v-icon>mdi-check</v-icon>
      {{ snackbarText }}

      <template #action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="updateSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="deleteSnackbar" color="success">
      <v-icon>mdi-check</v-icon>
      Site data deleted.

      <template #action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="deleteSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import store from '@/store'

@Component({
  store
})
export default class AdminSite extends Vue {
  private valid = true
  private updateSnackbar = false
  private snackbarText = ''

  private name = ''
  private nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 15) || 'Name must be less than 15 characters'
  ]

  private mapImage: File | null = null

  private deleteSiteDialog = false
  private deleteSnackbar = false

  mounted (): void {
    this.name = this.$store.state.siteName
  }

  submit (): void {
    if (this.valid) {
      this.$store.commit('setSiteName', this.name)
      this.snackbarText = 'Name updated'
      this.updateSnackbar = true

      if (this.mapImage) {
        this.$store.commit('setMapImageMeta', this.mapImage)

        this.$store.commit('setMapImageTile', {
          x: 0,
          y: 0,
          z: 0,
          tile: URL.createObjectURL(this.mapImage)
        })

        this.snackbarText = 'Name & map updated'
        this.updateSnackbar = true
      }
    }
  }

  deleteSite (): void {
    this.deleteSiteDialog = false

    this.deleteSnackbar = true
  }
}
</script>
