<template lang="pug">
    .container
      .search-bar
        img(src="@/assets/img/icon-search.svg")
        input.search-bar__input(
          type='text',
          v-model='fetchSearchQuery',
          placeholder='Search')
        button(
          @click="clearSearch",
          :class="{ inactive: fetchSearchQuery === '' }")
          img.close-icon(src="@/assets/img/icon-cross.svg")
      div.error-msg(v-if="checkError") Ooops😔!! There is a network error. Check Your connection
      div(v-else)
        todo-app(:todosList='todosList',
                  @add-todo='createTodoItem($event)',
                  @delete-todo='deleteTodoTask($event)',
                  @update-todo='updateCompleteTask($event)')
        pagination-page(:pages='pages', @change='switchPage($event)')
</template>

<script lang="ts">
/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */

import {
  defineComponent, onMounted, ref, watch,
} from '@vue/composition-api';

import PaginationPage from '@/components/Pagination.vue';
import TodoApp from '@/components/TodoApp.vue';
import {
  createTodo, getAllTodos, updateTodo, deleteTodoItem,
} from '@/services/EventServices';
import { Pagination } from '@/types/Pagination';
import { Todo } from '@/types/Todo';

export default defineComponent({
  name: 'todo-page',
  components: {
    'todo-app': TodoApp,
    'pagination-page': PaginationPage,
  },
  setup() {
    const todosList = ref<Todo[]>([]);
    const pages = ref<Pagination>({} as Pagination);
    const fetchSearchQuery = ref<string>('');
    const checkError = ref<string>('');

    const createTodoItem = async (description: string) => {
      try {
        const createTodoTask = await createTodo(description);

        todosList.value.push(createTodoTask);
      } catch (e) {
        console.error(e);
        return false;
      }
    };

    const updateCompleteTask = async (todo: Todo) => {
      try {
        await updateTodo(todo);
      } catch (e) {
        console.error(e);
      }
    };

    const deleteTodoTask = async (todo: Todo) => {
      try {
        await deleteTodoItem(todo);
        todosList.value = todosList.value.filter((task) => task._id !== todo._id);
      } catch (e) {
        console.error(e);
      }
    };

    const getTodos = async (offset = 0, limit = 5, description?: string) => {
      const response = await getAllTodos({ offset, limit, description });

      todosList.value = response.items;
      pages.value = response.meta;
      console.log(response);
    };

    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      getTodos().catch((e) => { checkError.value = e; });
    });

    let debouncetimeId: number;

    watch(fetchSearchQuery, (newSearchQuery) => {
      clearTimeout(debouncetimeId);
      debouncetimeId = setTimeout(() => {
        getTodos(0, undefined, newSearchQuery).catch((e) => console.error(e));
      }, 300);
    });

    const clearSearch = () => {
      fetchSearchQuery.value = '';
    };

    const switchPage = (pagination: Pagination) => {
      getTodos(pagination.offset, pagination.limit).catch((e) => console.error(e));
    };

    return {
      todosList,
      createTodoItem,
      getTodos,
      deleteTodoTask,
      updateCompleteTask,
      pages,
      fetchSearchQuery,
      clearSearch,
      switchPage,
      checkError,

    };
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
    padding: 0 var(--space-m);
    background-color: var(--color-grey-2);
    border-radius: var(--space-m);

    .search-bar__input {
      font-weight: 350;
      width: 100%;
      padding: var(--space-xs) var(--space-s);
      color: var(--color-grey-5);

      &::placeholder {
        color: var(--color-grey-5);
      }
    }
  }
  .inactive {
  pointer-events: none;
  opacity: .3;
}

.error-msg{
    margin-top: 10%;
    font-size: var(--space-l);
    color: var(--color-red-1);
  }
</style>
