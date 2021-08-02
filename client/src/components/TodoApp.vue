<template lang="pug">
    div
        add-todo(@create='$emit("add-todo", $event)')
        .todo-list
          todo-item(
            v-for='todo in todosList',
            :key='todo._id',
            :todo='todo',
            @delete='$emit("delete-todo", $event)',
            @update-todo='$emit("update-todo", $event)',
          ) {{ todo.description }}
</template>

<script lang="ts">
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
}

</style>
