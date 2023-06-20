<template>
  <div class="home-shop-list">
    <OpList
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div style="height: 100px" v-for="v in shopList" :key="v.id"></div>
    </OpList>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { fetchShopList } from '@/api/shop'
import type { IShop } from '@/types'
import OpList from '@/components/List/OpList'

const page = 1
const shopList = ref<IShop[]>([])
const loading = ref(false)
const finished = ref(false)

const onLoad = async () => {
  const { data, total } = await fetchShopList({
    _page: page,
    _limit: 5
  })
  shopList.value.push(...data)
  loading.value = false
  if (shopList.value.length >= total) {
    finished.value = true
  }
}
</script>

<style lang="scss" scoped>
.home-shop-list {
  padding: 8px 10px;
}
</style>
