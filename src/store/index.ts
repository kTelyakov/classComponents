import Vue from 'vue'
import Vuex from 'vuex'
import {ITweet} from "@/models/Tweet"
import { IComment } from "@/models/Comment"
import { saveToLs } from "@/utils/localStorage"

Vue.use(Vuex)

interface IState {
  tweets: object[]
  comments: object
  commentsAmount: object
}

export const stateObj: IState = {
  tweets: [],
  comments: {},
  commentsAmount: {}
}

const store = new Vuex.Store({
  state: {
    ...stateObj
  },
  mutations: {
    setState (state: any, { key, data }) {
      Vue.set(state, key, data)
    },

    setTweet (state: any, tweet: ITweet): void {
      state.tweets.push({...tweet})
      saveToLs('tweets', state.tweets)
    },
    setComment (state: any, comment: IComment): void {
      if (
        Array.isArray(state.comments[comment.parentId])
      ) {
        state.comments[comment.parentId].push(comment)
        saveToLs('comments', state.comments)
        return
      }
      Vue.set(state.comments, comment.parentId, [comment])
      saveToLs('comments', state.comments)
    },
    removeOldComments (state: any, { id, amount }): void { // Удаляем старые комменты
      let counter = +amount
      while (counter) {
        state.comments[+id].shift()
        counter--
      }
      saveToLs('comments', state.comments)
    },
    setCommentsAmount (state: any, { id, amount }): void {
      Vue.set(state.commentsAmount, +id, +amount)
      saveToLs('commentsAmount', state.commentsAmount)
    }
  },
  getters: {
    allTweets: (state): [] => state.tweets,
    allTweetsIds: (state): any => state.tweets.map((tweet: any) => +tweet.id),
    allComments: (state): [] => state.comments,
    allCommentsAmount: (state): [] => state.commentsAmount,
  }
})

export default store
