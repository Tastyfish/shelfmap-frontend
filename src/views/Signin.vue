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
      <v-row v-if="$store.state.accountCreationEnabled">
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
import { signIn } from '@/api/backend/user'

function isAxiosError (value: AxiosError | Error): value is AxiosError {
  return (value as AxiosError).response !== undefined
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
    if (this.$store.getters.signedIn) {
      this.$router.replace('/')
    }
  }

  signinFailed (error: AxiosError | Error) {
    const message = isAxiosError(error) ? error.response?.data?.errors?.[0]?.detail.toString() || error.response?.data.toString() : error.message

    this.error = message || 'Could not sign you in'
    this.$store.commit('signout')
  }

  signinSuccessful (response: AxiosResponse) {
    this.$store.commit('signin', { email: this.email, jwt: response.headers.authorization })
    this.error = ''
    this.$router.replace('/')
  }

  signin () {
    signIn(this.email, this.password)
      .then((response: AxiosResponse) => this.signinSuccessful(response))
      .catch((error: AxiosError) => this.signinFailed(error))
  }
}
</script>
