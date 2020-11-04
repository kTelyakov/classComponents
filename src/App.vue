<template>
  <div class="twitter">

    <!-- Шапка   -->
    <twitter-header
      @showtoptweets="showTopTwits = !showTopTwits"
    ></twitter-header>
    <div class="container">
      <div class="twitter__content">

        <!-- Лента   -->
        <div class="twitter__feed">
          <create-tweet></create-tweet>
          <feed></feed>
        </div>

        <!-- Самые обсуждаемые -->
        <div class="twitter__top-twits">
          <top-tweets></top-tweets>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Btn from '~/components/ui/Btn.vue'
import TwitterHeader from '~/components/Header.vue'
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import Feed from './layouts/Feed.vue'
import CreateTweet from '@/components/CreateTweet.vue'
import TopTweets from '@/layouts/TopTweets.vue'
import { initStorage } from "@/utils/localStorage"
import {ITweet} from "@/models/Tweet";
import {IComment } from "@/models/Comment";

@Component({
  components: {
    Feed,
    CreateTweet,
    TopTweets,
    Btn,
    TwitterHeader
  }
})
export default class App extends Vue {
  showTopTwits: boolean = true

  @Mutation('setTweet')
  setTweet!: (tweet: ITweet) => void

  @Mutation('setComment')
  setComment!: (comment: IComment) => void

  created () {
    initStorage.call(this)
  }
}
</script>

<style lang="scss">

@import '~@/themes/lightTheme.scss';
@import '~@/themes/darkTheme.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;300;500;700&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto Slab', serif;
  height: 100vh;
  width: 100vw;
  /*transition: background .4s;*/
  /*transition: color .4s;*/
  &._light {
    background: $mainBg;
    color: $allColorText;
  }
  &._dark {
    background: $dark_mainBg;
    color: $dark_allColorText;
  }
  -ms-overflow-style: none; // Скрываем скролл в IE
  overflow: -moz-scrollbars-none; // Скрываем скролл в FF
}

h1, h2, h3 {
  margin: 0;
}

input {
  height: 38px;
  font-family: 'Roboto Slab', serif;
  font-weight: 100;
  padding: 0px 10px;
}

.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}

.twitter {
  &__content {
    display: flex;
    width: 100%;
  }
  &__feed {
    display: block;
    width: 70%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  &__top-twits {
    display: block;
    width: 30%;
    padding-left: 20px;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
}
</style>
