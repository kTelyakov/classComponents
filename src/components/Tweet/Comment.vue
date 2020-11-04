<template>
  <div :class="`comment ${ darkTheme ? '_dark': ''}`">
    <div
      class="comment__avatar"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <img :src="avatar" alt="">
    </div>

    <!-- Текст комментария   -->
    <span class="comment__text">{{ comment.text }}</span>

    <!-- Дата -->
    <span class="comment__date">{{ comment.date }}</span>
    <div
      v-if="showTooltip"
      class="comment__tooltip"
    >
      {{ comment.author }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { IComment } from "@/models/Comment"

@Component
export default class Comment extends Vue {
  showTooltip: boolean = false

  @Prop({ type: [Object, Array], required: true })
  private comment!: IComment

  @State('darkTheme')
  darkTheme!: boolean

  get avatar () {
    return `https://robohash.org/${this.comment.author}.png`
  }
}

</script>

<style lang="scss" scoped>
@import '~@/themes/darkTheme';
.comment {
  $root: &;
  position: relative;
  border-bottom: 1px solid grey;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  &._dark {
    #{$root}__tooltip {
      background: $dark_mainBg;
    }
  }
  &__avatar {
    cursor: pointer;
    width: 40px;
    max-height: 100%;
    & img {
      width: 40px;
      height: 40px;
    }
  }
  &__text {
    font-size: 12px;
    font-weight: 100;
  }
  &__tooltip {
    z-index: 10;
    padding: 2px;
    border: 1px solid grey;
    background: white;
    position: absolute;
    bottom: -30px;
    font-weight: 100;
  }
  &__date {
    position: absolute;
    right: 2px;
    font-size: 10px;
    font-weight: 100;
    @media screen and (max-width:768px) {
      display: none;
    }
  }
}
</style>
