<template>
  <header class="twitter-header">
    <div class="container">
      <div class="twitter-header__buttons">
        <btn @click.native="changeTheme">Переключить тему</btn>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import Btn from '~/components/ui/Btn.vue'

@Component({
  components: {
    Btn
  }
})
export default class TwitterHeader extends Vue {
  @State('darkTheme')
  darkTheme!: boolean

  @Mutation('toggleTheme')
  toggleTheme!: () => void


  changeTheme (): void {
    if (this.darkTheme) {
      document.body.classList.remove('_dark')
      document.body.classList.add('_light')
      this.toggleTheme()
      return
    }
    document.body.classList.remove('_light')
    document.body.classList.add('_dark')
    this.toggleTheme()
  }
}
</script>

<style lang="scss" scoped>
.twitter-header {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 56px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
  & button {
    margin-right: 10px;
  }
  &__buttons {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
