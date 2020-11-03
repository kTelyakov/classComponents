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
        <v-row>
          <v-col sm="8" md="8">
            <create-tweet></create-tweet>
            <feed></feed>
          </v-col>
          <v-col sm="4" md="4">
            <top-tweets></top-tweets>
          </v-col>
        </v-row>

      </v-main>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import Feed from './layouts/Feed.vue'
import CreateTweet from '@/components/CreateTweet.vue'
import TopTweets from '@/layouts/TopTweets.vue'
import { initStorage } from "@/utils/localStorage"
import {ITweet} from "@/models/Tweet";
import {IComment, ICommentsAmount} from "@/models/Comment";

@Component({
  components: {
    Feed,
    CreateTweet,
    TopTweets
  }
})
export default class App extends Vue {

  @Mutation('setTweet')
  setTweet!: (tweet: ITweet) => void

  @Mutation('setComment')
  setComment!: (comment: IComment) => void

  @Mutation('setCommentsAmount')
  setCommentsAmount!: (amount: ICommentsAmount) => void

  lightThemeOn(): void {
    this.$vuetify.theme.dark = false
  }

  darkThemeOn(): void {
    this.$vuetify.theme.dark = true
  }

  created () {
    initStorage.call(this)
  }
}
</script>
