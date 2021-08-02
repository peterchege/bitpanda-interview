<template lang="pug">
    .container
      .search-bar
        button(@click="")
          img(src="@/assets/img/icon-search.svg")
        input.search-bar__input(placeholder="Search")
        button(@click="")
          img.close-icon(src="@/assets/img/icon-cross.svg")
      todo-app(:todosList='todosList',
               @add-todo='createTodo($event)',
               @delete-todo='deleteTodoTask($event)',
               @update-todo='updateCompleteTask($event)')
      pagination-page(:pages='pages', @change='switchPage($event)')

</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

import TodoApp from '../components/TodoApp.vue';
import PaginationPage from '../components/Pagination.vue';
import {
  createTodo, getAllTodos, updateTodo, deleteTodoItem,
} from '../services/EventServices';
import { Todo } from '../types/Todo';
import { Pagination } from '@/types/Pagination';


export default defineComponent({
  name: 'App',
  components: { 
    'todo-app': TodoApp,
    'pagination-page': PaginationPage },
  setup() {
    const todosList = ref<Todo[]>([]);
    const pages = ref<Pagination>({} as Pagination);

    const getTodos = async (offset = 0, limit = 5, description?: string) => {
      const response = await getAllTodos({ offset, limit, description });

      todosList.value = response.items;
      pages.value = response.meta;
      console.log(response);
    };

    return {
      todosList,
      getTodos,
      pages
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
    async updateCompleteTask(todo: Todo) {
      try {
        await updateTodo(todo);
      } catch (e) {
        console.error(e);
      }
    },
    async deleteTodoTask(todo: Todo) {
      try {
        await deleteTodoItem(todo);
        this.todosList = this.todosList.filter((t) => t._id !== todo._id);
      } catch (e) {
        console.error(e);
      }
    },
    switchPage(pagination: Pagination){
      this.getTodos(pagination.offset, pagination.limit).catch((e) => console.error(e));
    }
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
</style>
