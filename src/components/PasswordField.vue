<template>
  <v-text-field
    :name="name"
    :label="label"
    :value="value"
    @input="$emit('input', $event)"
    :type="revealPassword ? 'text' : 'password'"
    :append-icon="revealPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="revealPassword = !revealPassword"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
})
export default class PasswordField extends Vue {
  private revealPassword = false

  @Prop({ default: 'password' }) readonly name!: string
  @Prop({ default: 'Password' }) readonly label!: string
  @Prop({ default: '' }) readonly value!: string
}
</script>
