<template lang="pug">
    .container
      .search-bar
        button(@click="")
          img(src="@/assets/img/icon-search.svg")
        input.search-bar__input(placeholder="Search")
        button(@click="")
          img.close-icon(src="@/assets/img/icon-cross.svg")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App',
  setup() {
    // utilise todo-bitpanda-server to get data

  },
});
</script>

<style lang="scss">
  @import '@/assets/scss/theme.scss';
  .container {
      width: 100%;
      max-width: 600px;
      margin:  10% auto;
      padding: var(--space-xxl);
    }
    .search-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-l);
    padding: var(--space-xl);
    background-color: var(--color-grey-2);
    border-radius: var(--space-m);
    .search-bar__input {
      font-weight: 400;
      width: 100%;
      &::placeholder {
        color: var(--color-grey-5);
      }
    }
  }
</style>