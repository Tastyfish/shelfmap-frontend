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
import { signUp } from '@/api/backend/user'

function isAxiosError (value: AxiosError | Error): value is AxiosError {
  return (value as AxiosError).response !== undefined
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
    if (this.$store.getters.signedIn) {
      this.$router.replace('/')
    }
  }

  signupSuccessful (response: AxiosResponse): void {
    this.$store.commit('signin', { email: this.email, csrf: response.data.csrf })
    this.error = ''
    this.$router.replace('/')
  }

  signupFailed (error: AxiosError | Error) {
    const message = isAxiosError(error) ? error.response?.data?.errors?.[0]?.detail.toString() || error.response?.data.toString() : error.message
    console.log(error)
    if (isAxiosError(error)) { console.log(error?.response) }
    console.log(message)

    this.error = message || 'Could not create account.'
    this.$store.commit('signout')
  }

  createAccount (): void {
    signUp(this.email, this.password, this.confirmPassword)
      .then(response => this.signupSuccessful(response))
      .catch(error => this.signupFailed(error))
  }
}
</script>
