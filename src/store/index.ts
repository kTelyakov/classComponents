import Vue from 'vue'
import Vuex from 'vuex'
import {ITweet} from "@/models/Tweet"
import { IComment } from "@/models/Comment"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tweets: [],
    comments: {},
    commentsAmount: {}
  },
  mutations: {
    setTweet (state: any, tweet: ITweet): void {
      state.tweets.push({...tweet})
    },
    setComment (state: any, comment: IComment): void {
      if (
        Array.isArray(state.comments[comment.parentId])
      ) {
        state.comments[comment.parentId].push(comment)
        return
      }
      Vue.set(state.comments, comment.parentId, [comment])
    },
    removeOldComments (state: any, { id, amount }): void { // Удаляем старые комменты
      let counter = amount
      while (counter) {
        state.comments[id].shift()
        counter--
      }
    },
    setCommentsAmount (state: any, { tweetId, amount }): void {
      Vue.set(state.commentsAmount, tweetId, amount)
    }
  },
  getters: {
    allTweets: (state): [] => state.tweets,
    allComments: (state): [] => state.comments
  }
})
