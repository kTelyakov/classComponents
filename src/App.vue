<template>
  <v-app>
    <v-container>
      <v-app-bar
        app
        color="primary"
        dark
      >
        <v-btn @click="lightThemeOn" class="mr-3" outlined>Светлая тема</v-btn>
        <v-btn @click="darkThemeOn">Темная тема</v-btn>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main>
        <create-tweet></create-tweet>
        <feed></feed>
      </v-main>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Feed from './layouts/Feed.vue'
import CreateTweet from '@/components/CreateTweet.vue'

@Component({
  components: {
    Feed,
    CreateTweet
  }
})

export default class App extends Vue {

  lightThemeOn(): void {
    this.$vuetify.theme.dark = false
  }

  darkThemeOn(): void {
    this.$vuetify.theme.dark = true
  }
}
</script>
