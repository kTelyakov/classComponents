<template>
  <div>
    <v-card
      class="mx-auto d-flex mb-4 tweet"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <img
            class="tweet__avatar"
            v-bind="attrs"
            v-on="on"
            :src="tweet.avatar"
          ></img>
        </template>
        <span>{{ tweet.name }}</span>
      </v-tooltip>
      <v-card-text
        class="tweet__text"
        v-html="message"
      >
      </v-card-text>
      <div class="tweet__date">
        {{ genDate() }}
      </div>
    </v-card>
    <div class="tweet__comments-block">
      <comment
        v-for="comment in allComments[tweet.id]"
        :key="comment.id"
        :comment="comment"
      ></comment>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ITweet } from "@/models/Tweet"
import { IComment, ICommentsAmount } from "@/models/Comment"
import Comment from './Comment.vue'
import { genRandomName } from '@/utils/generateNames'
import CommentGenerator from "@/services/commentGenerator"
import { getRandomArbitrary } from '@/utils/random'
import { Mutation, Getter } from 'vuex-class'

@Component({
  components: {
    Comment
  }
})
export default class Tweet extends Vue {
  commentsAmountCounter: number = 0
  intervalId: number = 0

  @Prop({ type: Object, required: true })
  private tweet!: ITweet

  @Mutation('setComment')
  setComment!: (comment: IComment) => void

  @Mutation('setCommentsAmount')
  setCommentsAmount!: (amount: ICommentsAmount) => void

  @Mutation('removeOldComments')
  removeOldComments!: (amount: ICommentsAmount) => void

  @Getter('allComments')
  allComments!: () => void

  @Watch('commentsAmountCounter') // Счетчик комментариев для поста
  commentsAmountHandler(val: number) {
    this.setCommentsAmount({
      id: this.tweet.id,
      amount: this.commentsAmountCounter
    })
    if (val > 4) {
      this.removeOldComments({
        id: this.tweet.id,
        amount: 1
      })
    }

  }

  genDate () {
    const formatter = new Intl.DateTimeFormat("ru", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
    return formatter.format(new Date())
  }

  get message () {
    return this.tweet.message.replace(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g, '<img src="$&" />')
  }

  createComment (commentText: string): IComment {
    return {
      parentId: this.tweet.id,
      id: this.tweet.id + Math.random(), // Нуда, торопился
      author: genRandomName(),
      text: commentText
    }
  }

  async storeComment (): Promise<void> { // Генерим и сохраняем по 3 коммента для каждого поста
    const { data } = await CommentGenerator.create()
    const comment = this.createComment(data[0].slice(0, 40))
    this.setComment({
      ...comment
    })
    clearInterval(this.intervalId)
    this.startCommentsGenerate()
  }


  async startCommentsGenerate (): Promise<void> {
    const delay = getRandomArbitrary(300, 7000)
    this.intervalId = await setInterval(this.storeComment, delay)
    this.commentsAmountCounter++
  }

  async mounted () {
    this.startCommentsGenerate()
  }
}

</script>

<style lang="scss" scoped>
.tweet {
  height: 250px;
  position: relative;
  &__avatar {
    width: 250px;
    max-height: 100%;
  }
  &__date {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  &__text {
    overflow: scroll;
  }
  &__comments-block {
    padding-left: 40px;
  }
}
</style>
