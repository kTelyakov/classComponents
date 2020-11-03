<template>
  <div>
    <v-row class="align-center">
      <v-text-field
        outlined
        class="mr-1"
        label="О чем вы думаете"
        v-model="tweetMessage"
      ></v-text-field>
      <v-btn
        class="mb-8"
        outlined
        x-large
        :disabled="inputEmpty"
        @click="addTweet"
      >Поделиться</v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import { genRandomName } from "@/utils/generateNames"
import {Component, Vue, Watch} from 'vue-property-decorator'
import { Mutation, Getter } from "vuex-class"
import { ITweet } from '@/models/Tweet'

@Component
export default class CreateTweet extends Vue {
  tweetId: number = 1
  tweetMessage: string = ''
  inputEmpty: boolean = true

  @Mutation('setTweet')
  setTweet!: (tweet: ITweet) => void

  @Getter('allTweets')
  allTweets: any

  @Watch('tweetMessage')
  tweetMessageHandler(val: string, oldVal: string) {
    if (val) {
      this.inputEmpty = false
      return
    }
    this.inputEmpty = true
  }

  addTweet (): void {
    const userName: string = genRandomName() // Создали имя
    this.setTweet({
      id: this.tweetId,
      name: userName,
      avatar: `https://robohash.org/${userName}.png`,
      message: this.tweetMessage
    })
    this.tweetMessage = '' // Очистили поле
    this.tweetId++ // заинкрементили id
  }

  created () {
    this.tweetId = this.allTweets.length + 1
  }
}

</script>
