<template>
  <div>
    <tweet
      v-for="tweet in tweets"
      :key="tweet.id"
      :tweet="tweet"
    ></tweet>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import { State } from 'vuex-class'
import { ITweet } from "@/models/Tweet"
import { saveToLs } from "@/utils/localStorage"

import Tweet from '~/components/Tweet/index.vue'

@Component({
  components: {
    Tweet
  },
})

export default class Feed extends Vue {
  @State('tweets')
  tweets!: any

  @Watch('tweets') // Вотчим твиты и сохраняем в LS
  allTweetHandler (tweets: ITweet[]): void {
    saveToLs('tweets', tweets)
  }


}
</script>
