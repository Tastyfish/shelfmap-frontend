<template>
  <v-form @submit.prevent="createAccount" v-model="valid">
    <v-container style="max-width: 600px">
      <v-row>
        <v-col align="center">
          <div class="text-h2">
            Create account
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Email address" name="email" type="email"
            :rules="emailRules"
            v-model="email"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <PasswordField label="Password" name="password"
            :rules="passwordRules"
            v-model="password"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <PasswordField label="Confirm password" name="confirm_password"
            :rules="confirmPasswordRules"
            v-model="confirmPassword"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" large block type="submit" :disabled="!valid">
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

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import store from '@/store'
import PasswordField from '@/components/PasswordField.vue'
import { AxiosResponse, AxiosError } from 'axios'
import { plainAxios } from '@/api/backend'

function isError (value: AxiosError | AxiosResponse): value is AxiosError {
  return (value as AxiosError).toJSON !== undefined
}

@Component({
  store,
  components: {
    PasswordField
  }
})
export default class CreateAccount extends Vue {
  private valid = false
  private email = ''
  private password = ''
  private confirmPassword = ''
  private error = ''

  private emailRules = [
    (v: string) => v.includes('@') || 'Must be a valid email address.'
  ]

  private passwordRules = [
    (v: string) => v.length >= 8 || 'Password must be at least 8 characters long.'
  ]

  private confirmPasswordRules = [
    (v: string) => v.length >= 8 || 'Password must be at least 8 characters long.'
  ]

  get hasError (): boolean {
    return this.error.length > 0
  }

  set hasError (value: boolean) {
    this.error = ''
  }

  created () {
    this.checkedSignedIn()
  }

  updated () {
    this.checkedSignedIn()
  }

  checkedSignedIn () {
    if (this.$store.state.signedIn) {
      this.$router.replace('/')
    }
  }

  signupSuccessful (response: AxiosResponse): void {
    console.log(response)

    if (!response.data.csrf) {
      this.signupFailed(response)
      return
    }

    this.$store.commit('signin', { email: this.email, csrf: response.data.csrf })
    this.error = ''
    this.$router.replace('/')
  }

  signupFailed (msg: AxiosResponse | AxiosError) {
    const response = isError(msg) ? msg?.response : msg

    this.error = (response?.data?.error) || 'Something went wrong'
    this.$store.commit('signout')
  }

  createAccount (): void {
    /* eslint-disable @typescript-eslint/camelcase */
    plainAxios.post('/signup', { email: this.email, password: this.password, password_confirmation: this.confirmPassword })
      .then(response => this.signupSuccessful(response))
      .catch(error => this.signupFailed(error))
  }
}
</script>
