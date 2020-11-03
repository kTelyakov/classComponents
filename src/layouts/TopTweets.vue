<template>
  <v-card class="pa-4">
<!--    allTweetsIds: {{ allTweetsIds }}-->
<!--    allComments: {{ allComments }}-->
<!--    <div v-for="id in allTweetsIds">-->
      <v-list disabled>
        <v-subheader>Самые часто обсуждаемые посты</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="id in allTweetsIds"
            :key="id"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-chip outlined>
                  {{ allCommentsAmount[id] }}
                </v-chip>
                {{ findTweet(id).message }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

<!--    </div>-->

  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class TopTweets extends Vue {
  @Getter('allCommentsAmount')
  allCommentsAmount!: () => void

  @Getter('allTweets')
  allTweets: any

  @Getter('allComments')
  allComments!: () => void

  @Getter('allTweetsIds')
  allTweetsIds!: () => void

  findTweet (id: number) {
    return this.allTweets.find((tweet: any): boolean => tweet.id === id)
  }

}
</script>
