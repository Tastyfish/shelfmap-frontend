<template>
  <v-form @submit.prevent="signin">
    <v-container style="max-width: 600px">
      <v-row>
        <v-col align="center">
          <div class="text-h2">
            Sign in
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Email address" name="email"
            v-model="email"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <PasswordField label="Password" name="password"
            v-model="password"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" large block type="submit">
            Sign in
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="secondary" text block
            :to="{ name: 'create-account' }"
          >
            Create account
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="hasError" width="500">
      <v-card>
        <v-card-title>
          Sign in error
        </v-card-title>
        <v-card-text>
          {{ error }}
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="hasError = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import store from '@/store'
import PasswordField from '@/components/PasswordField.vue'
import { AxiosResponse, AxiosError } from 'axios'
import { plainAxios } from '@/api/backend'

function isError (value: AxiosError | AxiosResponse): value is AxiosError {
  return (value as AxiosError).toJSON !== undefined
}

@Component({
  components: {
    PasswordField
  },
  store
})
export default class Signin extends Vue {
  private email = ''
  private password = ''
  private error = ''

  get hasError (): boolean {
    return this.error.length > 0
  }

  set hasError (value: boolean) {
    this.error = ''
  }

  submit (): void {
    alert('hi')
  }

  created () {
    this.checkSignedIn()
  }

  updated () {
    this.checkSignedIn()
  }

  checkSignedIn () {
    if (this.$store.state.signedIn) {
      this.$router.replace('/')
    }
  }

  signinFailed (msg: AxiosError | AxiosResponse) {
    const response = isError(msg) ? msg?.response : msg

    this.error = response?.data?.error || `Could not sign you in: Error ${response?.status}`
    this.$store.commit('signout')
  }

  signinSuccessful (response: AxiosResponse) {
    if (!response.data.csrf) {
      this.signinFailed(response)
      return
    }
    this.$store.commit('signin', { email: this.email, csrf: response.data.csrf })
    this.error = ''
    this.$router.replace('/')
  }

  signin () {
    plainAxios.post('/signin', { email: this.email, password: this.password })
      .then((response: AxiosResponse) => this.signinSuccessful(response))
      .catch((error: AxiosError) => this.signinFailed(error))
  }
}
</script>
