<template>
  <div class="op-loading" v-if="loading">
    <slot name="template">
      <div v-if="type === 'loading'" class="loading-wrapper">
        <VanLoading />
      </div>
      <div v-if="type === 'skeleton'" class="skeleton-wrapper">
        <div class="skeleton-wrapper__transformer">
          <div class="transformer__item" v-for="item in 15" :key="item">
            <VanSkeleton avatar avatar-shape="square" avatar-size="48" />
          </div>
        </div>
        <VanSkeleton avatar title :row="10" />
      </div>
    </slot>
  </div>
  <slot v-else></slot>
</template>

<script lang="ts" setup>
interface IProps {
  loading: boolean
  type: 'loading' | 'skeleton'
}
defineProps<IProps>()
</script>

<style lang="scss" scoped>
.op-loading {
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  .skeleton-wrapper {
    padding: 20px 10px;
    &__transformer {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      place-items: center;

      .transformer__item {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
<style lang="scss">
.op-loading {
  background-color: white;
  .transformer__item {
    .van-skeleton {
      padding: 0;
      &-avatar {
        margin: 0;
      }
      &__content {
        display: none;
      }
    }
  }
}
</style>
