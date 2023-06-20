<!-- 金刚区 -->
<template>
  <div class="transformer">
    <div v-for="v in data" :key="v.label" class="transformer__item">
      <img :src="v.imgUrl" />
      <div>{{ v.label }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ITransformer } from '@/types'

interface IProps<T> {
  data: T[]
}

defineProps<IProps<ITransformer>>()
</script>

<style lang="scss" scoped>
.transformer {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 10px;

  &__item {
    font-size: 13px;
    line-height: 15px;
    text-align: center;

    img {
      width: 48px;
    }
  }
}
</style>
