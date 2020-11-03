<template>
  <div>
    <tweet
      v-for="tweet in allTweets"
      :key="tweet.id"
      :tweet="tweet"
    ></tweet>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Getter } from 'vuex-class'
import Tweet from '~/components/Tweet/index.vue'

@Component({
  components: {
    Tweet
  },
})

export default class Feed extends Vue {
  @Getter('allTweets')
  allTweets: any
}
</script>
