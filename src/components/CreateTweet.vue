<template>
  <div class="twitter__create">
    <input
      :class="`twitter__create-input ${darkTheme ? '_dark' : ''}`"
      type="text"
      placeholder="O чем вы думаете"
      v-model="tweetMessage"
    ></input>
    <btn
      :disabled="inputEmpty"
      @click.native="addTweet"
    >Поделиться</btn>
  </div>
</template>

<script lang="ts">
import { genRandomName } from "@/utils/generateNames"
import {Component, Vue, Watch} from 'vue-property-decorator'
import { Mutation, State } from "vuex-class"
import { ITweet } from '@/models/Tweet'
import Btn from '~/components/ui/Btn.vue'
const uid = require('get-uid')

@Component({
  components: {
    Btn
  }
})
export default class CreateTweet extends Vue {

  tweetMessage: string = ''
  inputEmpty: boolean = true

  @Mutation('setTweet')
  setTweet!: (tweet: ITweet) => void

  @State('darkTheme')
  darkTheme!: boolean

  @Watch('tweetMessage')
  tweetMessageHandler(val: string) { // Дизейбл кнопки
    if (val) {
      this.inputEmpty = false
      return
    }
    this.inputEmpty = true
  }

  addTweet (): void {
    const userName: string = genRandomName() // Создали имя
    this.setTweet({
      id: uid(), // Сгенерили id
      name: userName,
      avatar: `https://robohash.org/${userName}.png`,
      message: this.tweetMessage
    })
    this.tweetMessage = '' // Очистили поле
  }

}

</script>

<style lang="scss" scoped>
@import "~@/themes/lightTheme";
@import "~@/themes/darkTheme";

.twitter__create {
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px;
  &-input {
    width: 100%;
    margin-right: 5px;
    background: $mainBg;
    &._dark {
      background: $dark_mainBg;
    }
  }
}
</style>
