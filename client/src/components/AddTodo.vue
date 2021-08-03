<template lang="pug">
      .todo
        .todo_bottom-round
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
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'add-todo',
  setup(_, { emit }) {
    const newTodoDescription = ref('');
    const addTodoTask = () => {
      if (newTodoDescription.value) {
        emit('create', newTodoDescription.value);
        newTodoDescription.value = '';
      }
    };

    return {
      newTodoDescription,
      addTodoTask,
    };
  },

});
</script>

<style lang="scss">
  @import '../assets/scss/theme.scss';

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

  }

</style>
