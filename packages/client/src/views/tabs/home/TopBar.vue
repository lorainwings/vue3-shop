<template>
  <div class="top-bar">
    <div class="top">
      <img src="@/assets/imgs/home/location.png" class="location-icon" />
      <div class="location">蜀郡(北一区东南门)</div>
      <img src="@/assets/imgs/home/shopcart.png" class="shopcart-icon" />
      <img src="@/assets/imgs/home/comments.png" class="comments-icon" />
    </div>

    <!-- <VanSearch
      shape="round"
      background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
      placeholder="世界茶饮 35减2"
    >
      <template #right-icon>
        <div>搜索</div>
      </template>
    </VanSearch> -->
    <VanSticky>
      <Search
        shape="round"
        background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
        placeholder="世界茶饮 35减2"
        @inputClick="emits('searchClick')"
      >
        <template #right-icon>
          <div @click="emits('searchClick')">搜索</div>
        </template>
      </Search>
    </VanSticky>

    <div class="search-recommend">
      <div v-for="v in recomments" :key="v.value" class="tag">
        {{ v.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ISearchRecomment } from '@/types'
import Search from '@/components/Search.vue'

interface IProps {
  recomments: Array<ISearchRecomment>
}

interface IEmits {
  (e: 'searchClick'): void
}
defineProps<IProps>()
const emits = defineEmits<IEmits>()
</script>

<style lang="scss" scoped>
.top-bar {
  background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
  color: #fff;
  .top {
    display: flex;
    align-items: center;
    padding: 10px 10px 0 10px;
    line-height: 15px;
    font-size: 15px;
    font-weight: bold;
    .location-icon {
      width: 20px;
      height: 20px;
    }
    .location {
      flex: 1;
    }
    .shopcart-icon {
      width: 24px;
      height: 24px;
    }
    .comments-icon {
      width: 28px;
      height: 24px;
      margin-left: 10px;
    }
  }

  .search-recommend {
    display: flex;
    padding: 0 10px 8px;
    .tag {
      font-size: 12px;
      border-radius: 10px;
      background: rgb(242, 242, 242, 0.3);
      padding: 2px 8px;
      margin-right: 10px;
    }
  }
}
</style>

<style lang="scss">
.top-bar {
  .van-field__right-icon {
    margin-right: 0;
  }
}
</style>
