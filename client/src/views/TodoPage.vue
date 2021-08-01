<template lang="pug">
    .container
      .search-bar
        button(@click="")
          img(src="@/assets/img/icon-search.svg")
        input.search-bar__input(placeholder="Search")
        button(@click="")
          img.close-icon(src="@/assets/img/icon-cross.svg")
      todo-app(:todosList='todosList',
               @add-todo='createTodo($event)')
      .pagination
        .pagination__button
          img.pagination__img(
            src="@/assets/img/icon-left-arrow.svg",
            alt="arrow left",
            )
          span.pagination__divider
          img.pagination__img(
            src="@/assets/img/icon-right-arrow.svg",
            alt="arrow right",
            )

</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import TodoApp from '../components/TodoApp.vue';
import { createTodo, getAllTodos } from '../services/EventServices';
import { Todo } from '../types/Todo';

export default defineComponent({
  name: 'App',
  components: { 'todo-app': TodoApp },
  setup() {
    const todosList = ref<Todo[]>([]);

    const getTodos = async (offset = 0, limit = 5, description?: string) => {
      const response = await getAllTodos({ offset, limit, description });

      todosList.value = response.items;
      console.log(response);
    };

    return {
      todosList,
      getTodos,
    };
  },

  mounted() {
    this.getTodos().catch((e) => { console.error(e); });
  },

  methods: {
    async createTodo(description: string) {
      try {
        const createTodoTask = await createTodo(description);

        this.todosList.push(createTodoTask);
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },

});
</script>

<style lang="scss">
  @import '@/assets/scss/theme.scss';

  .container {
      width: 100%;
      max-width: 600px;
      margin:  5% auto;
      padding: var(--space-xxl);
    }

    .search-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-l);
    padding: var(--space-xs);
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

  .pagination {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

  &__button {
    width: 4.5rem;
    margin-top: var(--space-l);
    padding: var(--space-xs);
    display: flex;
    justify-content: flex-end;
    justify-content: space-around;
    align-items: center;
    border-radius: 0 0 var(--space-m) var(--space-m);
    border-bottom: 1px solid var(--color-grey-3);
    font-size: var(--space-xl);
    color: var(--color-grey-5);
    background-color: var(--color-grey-1);
  }

  &__divider {
    width: 0;
    height: var(--space-xl);
    border-right: 2px solid get-color-opacity(var(--color-grey-5), 0.6);
  }

  &__img {
    cursor: pointer;

    &--disable {
      opacity: 0.5;
      cursor: not-allowed;
      }
    }
  }
</style>
