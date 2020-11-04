<template>
  <button :class="{...rootClasses}">
    <span
      class="btn__inner"
      :class="{...innerClasses}"
    >
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Btn extends Vue {

  @State('darkTheme')
  darkTheme!: boolean

  @Prop({type: Boolean})
  disabled!: boolean

  get innerClasses (): object {
    return {
      '_dark': this.darkTheme,
      '_disabled': this.disabled
    }
  }

  get rootClasses (): object {
    return {
      'btn': true,
      '_disabled': this.disabled
    }
  }
}


</script>

<style lang="scss" scoped>
@import '~@/themes/darkTheme.scss';
@import '~@/themes/lightTheme.scss';
.btn {
  border: 1px solid red;
  font-family: 'Roboto Slab', serif;
  display: block;
  cursor: pointer;
  outline: none;
  border-radius: 3px;
  border: 1px solid transparent;
  height: 40px;
  background: transparent;
  user-select: none;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
  &:hover {
    border: 1px solid grey;
  }
  &:active {
    box-shadow: none;
  }
  &._disabled {
    pointer-events: none;
    box-shadow: none;
  }
  &__inner {
    text-align: center;
    min-width: 120px;
    min-height: 40px;
    padding: 8px 12px;
    font-size: 16px;
    line-height: 1.25;
    color: $btnText;
    &._dark {
      color: $dark_btnText;
    }

  }
}
</style>
