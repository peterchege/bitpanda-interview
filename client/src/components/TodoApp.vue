<template lang="pug">
    div
        add-todo(@create='$emit("add-todo", $event)')
        .todo-list
          .todo-list__msg(v-if="todosList && todosList.length < 1"
              ) List is Empty. Create your tasks! 🙂
          todo-item(
            v-for='todo in todosList',
            :key='todo._id',
            :todo='todo',
            @delete='$emit("delete-todo", $event)',
            @update-todo='$emit("update-todo", $event)',
          ) {{ todo.description }}
</template>

<script lang="ts">
/* eslint-disable import/no-unresolved */

import { defineComponent, PropType } from '@vue/composition-api';

import { Todo } from '@/types/Todo';

import AddTodo from './AddTodo.vue';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  name: 'todo-app',
  props: { todosList: { type: Array as PropType<Todo[]>, required: true } },
  components: {
    'add-todo': AddTodo,
    'todo-item': TodoItem,
  },
});
</script>

<style scoped lang="scss">
@import '../assets/scss/theme.scss';

.todo-list {
  border: 1px solid var(--color-grey-3);
  border-radius: 0 0 var(--space-m) var(--space-m);
  box-sizing: border-box;
  width: 100%;

  &__msg {
    margin: 10% auto;
    font-size: var(--space-l);
    color: var(--color-grey-5);
  }
}

</style>
