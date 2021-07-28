<template lang="pug">
    .container
      .search-bar
        button(@click="fetchQuery")
          img(src="@/assets/img/icon-search.svg")
        input.search-bar__input(placeholder="Search")
        button(@click="clearSearch")
          img.close-icon(src="@/assets/img/icon-cross.svg")
      .todo
        .add-todo_bottom-round
        input.todo__input(
          v-model="newTodoDescription"
          type="text"
          placeholder="Take a note"
          @keyup.enter="addTodoTask"
        )
        button(@click="addTodoTask")
          img(src="@/assets/img/icon-plus.svg")
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
  
    .todo {
    display: flex;
    padding: var(--space-l) var(--space-xl);
    background-color: var(--color-grey-1);
    border-radius: var(--space-m) var(--space-m) 0 0;
    border: 1px solid var(--color-grey-3);
    &.todo_bottom-round {
      border-radius: var(--space-m);
    }
    .todo__input {
      width: 100%;
      &::placeholder {
        color: var(--color-grey-4);
      }
    }
    .todos-list {
    margin-bottom: var(--space-l);
    background-color: var(--color-white);
    border-radius: 0 0 var(--space-m) var(--space-m);
    border: 1px solid var(--color-grey-3);
    border-top: none;
    }
  }
 

</style>