<template>
  <div class="twit">

    <!-- ТВИТ   -->
    <tweet-card
      :tweet="tweet"
    ></tweet-card>

    <!-- Комменты к нему   -->
    <div class="twit__comments">
      <comment
        v-for="comment in getLatestComments()"
        :key="comment.id"
        :comment="comment"
      ></comment>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ITweet } from "@/models/Tweet"
import { IComment } from "@/models/Comment"
import Comment from './Comment.vue'
import { genRandomName } from '@/utils/generateNames'
import CommentGenerator from "@/services/commentGenerator"
import { getRandomArbitrary } from '@/utils/random'
import { Mutation, Getter, State } from 'vuex-class'
import TweetCard from './TweetCard.vue'
const uid = require('get-uid')
import { clone } from 'ramda'
import { saveToLs } from "@/utils/localStorage"


@Component({
  components: {
    Comment,
    TweetCard
  }
})
export default class Tweet extends Vue {
  intervalId: number = 0

  @Prop({ type: Object, required: true })
  private tweet!: ITweet

  @Mutation('setComment')
  setComment!: (comment: IComment) => void

  @State('tweets')
  tweets!: []

  @State('comments')
  comments!: any

  createComment (commentText: string): IComment { // Создаем коммент
    const today: Date = new Date()
    return {
      parentId: this.tweet.id,
      id: uid(),
      author: genRandomName(),
      text: commentText,
      date: today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    }
  }

  async storeComment (): Promise<any> { // Генерим и сохраняем по 3 коммента для каждого поста
    const { data } = await CommentGenerator.create()
    const comment = this.createComment(data[0].slice(0, 40))
    this.setComment({
      ...comment
    })
    saveToLs('comments', this.comments) // Сохраняем в LS
    clearInterval(this.intervalId)
    this.startCommentsGenerate()
  }


  async startCommentsGenerate (): Promise<any> { // Начинаем генерить комменты
    const delay = getRandomArbitrary(5000, 30000)
    this.intervalId = await setInterval(this.storeComment, delay)
  }

  getLatestComments (): [] { // Берем последние 3 комментария
    const comments: any = this.comments[this.tweet.id]
    if (!comments) return []

    const commentsCopy: any = clone(comments)
    if (commentsCopy.length <= 3) {
      return commentsCopy
    }
    return commentsCopy.splice(commentsCopy.length-3, commentsCopy.length-1)
  }

  async mounted () {
    this.startCommentsGenerate()
  }
}

</script>

<style lang="scss" scoped>
.twit {
  margin-bottom: 15px;
  &__comments {
    padding-left: 40px;
  }
}
</style>

