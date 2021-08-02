<template lang="pug">
    button.checkbox(@click='$emit("update", !checked)')
        span.checkbox_marked(v-if='checked')
          img(src="@/assets/img/icon-tick.svg")
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'checkbox',
  props: { checked: { type: Boolean, required: true } },
});
</script>

<style lang="scss" scoped>
@import '../assets/scss/theme.scss';

.checkbox {
  flex: 0 0 auto;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: 0.8px solid var(--color-grey-2);
  background-color: var(--color-grey-1);
  border-radius: 50%;
  cursor: pointer;
  &_checkmark {
    position: relative;
    left: 2px;
    top: 2px;
  }
}
</style>
