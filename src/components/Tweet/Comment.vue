<template>
  <v-card
    class="mx-auto d-flex mb-4 comment"
  >
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <img
          class="comment__avatar"
          v-bind="attrs"
          v-on="on"
          :src="avatar"
        ></img>
      </template>
      <span>{{ comment.author }}</span>
    </v-tooltip>
    <v-card-text class="comment__text">
      {{ comment.text }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IComment } from "@/models/Comment"

@Component
export default class Comment extends Vue {

  @Prop({ type: [Object, Array], required: true })
  private comment!: IComment

  get avatar () {
    return `https://robohash.org/${this.comment.author}.png`
  }
}

</script>

<style lang="scss" scoped>
  .comment {
    height: 50px;
    &__avatar {
      width: 50px;
      max-height: 100%;
    }
  }
</style>
