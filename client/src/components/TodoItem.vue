<template lang="pug">
  li.todo-item(:class='markAsDone')
    checkbox.todo-item_checkbox(
      :checked='todo.done',
      @update='updateCompleteTodoTask(todo)'
    )

    p.todo-item_description {{ todo.description }}
    span.todo-item_created-at - {{ createdTime }} minutes

    span.todo-item_deleteTodo(@click='$emit("delete", todo)')
      img(src="@/assets/img/icon-cross.svg")

</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */

import { computed, defineComponent, PropType, toRefs } from '@vue/composition-api';
import moment from 'moment';

import { Todo } from '@/types/Todo';

import Checkbox from './Checkbox.vue';

export default defineComponent({
  name: 'todo-item',
  props: { todo: { type: Object as PropType<Todo>, required: true } },
  setup(props, { emit }) {
    const { todo } = toRefs(props);

    const markAsDone = computed((): Record<string, boolean> => ({
      'todo-item-markCompleted': todo.value.done,
    }));

    const createdTime = computed((): number => {
      const startTime = moment(Date.now());
      const createdAt = moment(todo.value.createdAt);
      const timeElapsed = startTime.diff(createdAt, 'minute');

      return timeElapsed;
    });

    const updateCompleteTodoTask = () => {
      todo.value.done = !todo.value.done;
      return emit('update-todo', todo.value);
    };

    return {
      markAsDone,
      createdTime,
      updateCompleteTodoTask,
    };
  },
  components: {
    Checkbox,
  },

});

</script>

<style lang="scss" scoped>
  @import '../assets/scss/theme.scss';

.todo-item {
  display: flex;
  justify-content: flex-start;
  min-height: 5rem;
  align-items: center;
  text-align: center;
  border-top: 0.9px solid var(--color-grey-3);
  &_description {
    text-align: left;
    padding: 10px ;
    word-break: break-all;

  }
  &_deleteTodo {
    margin: 0 10px 0 auto;
    padding: var(--space-s) var(--space-m);
    cursor: pointer;
    opacity: 0;
  }

  &:hover &_deleteTodo {
    opacity: 1;
  }

  &_checkbox {
    margin: 5px 0.5rem 5px 10px;
  }

  &-markCompleted &_description {
    text-decoration-line: line-through;
    color: var(--color-grey-2);
  }

  &_created-at {
    font-weight: 300;
    font-size: var(--space-s);
    color: var(--color-grey-5);
    white-space: nowrap;
    display: flex;
  }

}
</style>
