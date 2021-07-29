<template lang="pug">
      add-todo(
        @create='$emit("add-todo", $event)'
      )
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import AddTodo from './AddTodo.vue';

export default defineComponent({
  name: 'Todo App',
  components: { 'add-todo': AddTodo,}
});
</script>

