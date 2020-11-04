<template>
  <card :class="`twit-card ${darkTheme ? '_dark' : ''}`">
    <div
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      class="twit-card__avatar"
    >
      <img
        class="twit-card__avatar-img"
        :src="tweet.avatar || '/avatar.png'"
      ></img>
      <span
        v-if="showTooltip"
        class="twit-card__avatar-tooltip"
      >{{ tweet.name }}</span>
    </div>

    <!-- Текст твита   -->
    <div class="twit-card__text" v-html="message"></div>

    <div class="twit-card__date">
      {{ genDate() }}
    </div>
  </card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { ITweet } from "@/models/Tweet"
import Comment from './Comment.vue'
import { genDate } from '@/utils/generateNames'
import Card from '~/components/ui/Card.vue'

@Component({
  components: {
    Comment,
    Card
  }
})
export default class TweetCard extends Vue {
  showTooltip: boolean = false
  genDate: Function = genDate

  @Prop({ type: Object, required: true })
  private tweet!: ITweet

  @State('darkTheme')
  darkTheme!: boolean

  get message () {
    return this.findAndReplaceImg(this.tweet.message)
  }

  findAndReplaceImg (text: string): string {
    return text.replace(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g, '<img src="$&" />')
  }
}
</script>

<style lang="scss" scoped>
@import '~@/themes/darkTheme';
.twit-card {
  $root: &;
  position: relative;
  padding: 5px;
  margin-bottom: 5px;
  display: flex;
  &._dark {
    #{$root}__avatar-tooltip {
      background: $dark_mainBg;
    }
  }
  &__avatar {
    position: relative;
    height: 75px;
    width: 75px;
    &-img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    &-tooltip {
      position: absolute;
      bottom: -20px;
      left: 0;
      z-index: 100;
      padding: 5px;
      background: white;
      font-weight: 100;
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
    }
  }
  &__date {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-weight: 100;
    font-size: 10px;
  }
  &__text {
    overflow-y: scroll;
    text-wrap: normal;
    width: 100%;
    height: auto;
    font-weight: 300;
    font-size: 15px;
  }
  &__comments-block {
    padding-left: 40px;
  }
}
</style>
