<template>
  <card :class="`top-twits ${darkTheme ? '_dark' : ''}`">
    <h3 class="top-twits__title">Самые обсуждаемые</h3>

    <div class="top-twits__list">
      <div
        v-for="id in tweetsIds"
        :key="id"
        class="top-twits__item"
      >
        <div class="top-twits__item-count">
          {{ getTweetCommentsAmount(id) }}
        </div>
        <div class="top-twits__item-title">
          {{ getTweetMessage(id) }}
        </div>
      </div>
    </div>

  </card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/ui/Card.vue'
import { State } from 'vuex-class'

@Component({
  components: {
    Card
  }
})
export default class TopTweets extends Vue {

  @State('darkTheme')
  darkTheme!: boolean

  @State('tweets')
  tweets!: []

  @State('comments')
  comments!: []

  get tweetsIds () {
    return this.tweets.map((tweet: any) => tweet.id)
  }

  getTweetById (id: number) {
    return this.tweets.find((tweet: any): boolean => tweet.id === id)
  }

  getTweetMessage (id: number) {
    const findedTwit: any = this.getTweetById(id)
    return findedTwit?.message.slice(0, 10) + '...'
  }

  getTweetCommentsAmount (id: number) {
    const tweetComments: any = this.comments[id]
    return tweetComments?.length || 0
  }

}
</script>

<style lang="scss" scoped>
@import '~@/themes/darkTheme.scss';
@import '~@/themes/lightTheme.scss';

.top-twits {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 15px;
  background: $mainBg;
  &._dark {
    background: $dark_mainBg;
  }

  &__title {
    margin-bottom: 10px;
  }
  &__item {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 5px;
    &-count {
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 40px;
      font-weight: 700;
      margin-right: 10px;
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
    }
    &-title {
      font-weight: 300;
    }
  }
}
</style>
