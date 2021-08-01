<template lang="pug">
  li.todo-item(:class='markAsDone')
    checkbox.todo-item_checkbox(
      :checked='todo.done',
      @update='updateCompleteTodoTask(todo)'
    )

    p.todo-item_description {{ todo.description }}
    span.todo-item_created-at - {{ createdTime }} minutes

</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import moment from 'moment';

import { Todo } from '@/types/Todo';

import Checkbox from './Checkbox.vue';

export default defineComponent({
  name: 'todo-item',
  props: { todo: { type: Object as PropType<Todo>, required: true } },
  computed: {
    markAsDone(): Record<string, boolean> {
      return {
        'todo-item-markCompleted': this.todo.done,
      };
    },
    createdTime(): number {
      const startTime = moment(Date.now());
      const createdAt = moment(this.todo.createdAt);
      const timeElapsed = startTime.diff(createdAt, 'minute');

      return timeElapsed;
    },
  },
  data() {
    return {};
  },
  components: {
    Checkbox,
  },
  methods: {
    updateCompleteTodoTask(todo: Todo) {
      todo.done = !todo.done;
      this.$emit('update-todo', todo);
    },
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
