<template lang="pug">
    .pagination
        .pagination__button
          button(
            direction='previousPage'
            :disabled='!pages.hasPrevPage',
            :class="{'pagination__img--disable': !pages.hasPrevPage}",
            @click='switchPage(-1)'
            )
            img.pagination__img(
              src="@/assets/img/icon-left-arrow.svg",
              :class="{'pagination__img--disable': !pages.hasPrevPage}",
              alt="arrow left",
              )
          span.pagination__divider
          button(
            direction='nextPage'
            :disabled='!pages.hasNextPage',
            :class="{'pagination__img--disable': !pages.hasNextPage}",
            @click='switchPage(1)'
            )
            img.pagination__img(
              src="@/assets/img/icon-right-arrow.svg",
              :class="{'pagination__img--disable': !pages.hasNextPage}",
              alt="arrow right",
              )
</template>

<script lang="ts">
/* eslint-disable import/no-unresolved */

import { defineComponent, PropType, toRefs } from '@vue/composition-api';

import { Pagination } from '@/types/Pagination';

export default defineComponent({
  name: 'Pagination',
  props: { pages: { type: Object as PropType<Pagination>, required: true } },
  setup(props, { emit }) {
    const { pages } = toRefs(props);

    const switchPage = (dir:number) => {
      const page = { ...pages.value };

      page.offset += page.limit * dir;
      return emit('change', page);
    };

    return {
      switchPage,
    };
  },

});
</script>

<style lang="scss">
  @import '@/assets/scss/theme.scss';

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
    border-radius: var(--space-m) var(--space-m);
    border-bottom: 1px solid var(--color-grey-3);
    font-size: var(--space-xl);
    color: var(--color-grey-5);
    background-color: var(--color-grey-1);
  }

  &__divider {
    width: 0;
    margin: 0 auto;
    height: var(--space-l);
    border-right: 2px solid var(--color-grey-5);
    opacity: 0.6;
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
