import Vue from 'vue'
import Vuex from 'vuex'
import {ITweet} from "@/models/Tweet"
import { IComment } from "@/models/Comment"

Vue.use(Vuex)

interface IState {
  tweets: object[]
  comments: object
  darkTheme: boolean
}

export const stateObj: IState = {
  tweets: [],
  comments: {},
  darkTheme: false
}

const store = new Vuex.Store({
  state: {
    ...stateObj
  },
  mutations: {
    setState (state: IState, { key, data }) {
      Vue.set(state, key, data)
    },

    toggleTheme (state: IState) {
      state.darkTheme = !state.darkTheme
    },

    setTweet (state: IState, tweet: ITweet): void {
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
  },
})

export default store
