<template>
  <div class="ma-6">
    <div class="text-h1 mb-6">
      Oops!
    </div>
    <div class="text-h4 text-md-h2 text-weight-light mb-6">
      The page could not be found.
    </div>
    <v-btn color="primary" block large @click="$router.go(-1)">
      <v-icon left>mdi-chevron-left</v-icon>
      Go back
    </v-btn>
  </div>
</template>
