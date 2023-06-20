<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchShow" @cancel="setIsSearchShow"></SearchView>
    </Transition>

    <template v-if="!isSearchShow">
      <TopBar :recomments="recomments" @searchClick="setIsSearchShow"></TopBar>
      <Loading :loading="pending" type="skeleton">
        <div class="home-page__banner">
          <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" />
        </div>
        <Transformer :data="data.transformer"></Transformer>
        <ScrollBar :data="data.scrollBarInfoList" />
        <div class="home-page__activity">
          <CountDown :data="data.countdown"></CountDown>
          <Swipe class="home-page__activity__swipe" :autoplay="3000">
            <SwipeItem v-for="v in data.activities" :key="v">
              <img :src="v" />
            </SwipeItem>
          </Swipe>
        </div>
        <VanTabs
          sticky
          offset-top="54px"
          :color="PRIMARY_COLOR"
          :background="tabBackgroundColor"
          @scroll="onTabScroll"
        >
          <VanTab v-for="v in HOME_TABS" :key="v.value" :title="v.title">
            <component :is="v.component"></component>
          </VanTab>
        </VanTabs>
      </Loading>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IHomeInfo, ICountdown } from '@/types'
import { ref } from 'vue'
import TopBar from './TopBar.vue'
import SearchView from '@/views/search/SearchView.vue'
import Loading from '@/components/Loading.vue'
import Transformer from './Transformer.vue'
import ScrollBar from './ScrollBar.vue'
import CountDown from './CountDown.vue'
import Swipe from '@/components/Swipe/Swipe'
import SwipeItem from '@/components/Swipe/SwipeItem'
import { PRIMARY_COLOR, TRANSPARENT } from '@/config'
import { HOME_TABS } from './config'

import { useToggle } from '@/use/useToggle'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'

const recomments = [
  {
    value: 1,
    label: '牛腩'
  },
  {
    value: 2,
    label: '色拉'
  }
]

const [isSearchShow, setIsSearchShow] = useToggle(false)
const { data, pending } = useAsync<IHomeInfo>(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: []
})

const tabBackgroundColor = ref<string>(TRANSPARENT)
const onTabScroll = ({ isFixed }: { isFixed: boolean }) => {
  tabBackgroundColor.value = isFixed ? 'white' : TRANSPARENT
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.home-page {
  background: var(--op-gray-bg-color);
  padding-bottom: 70px;

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }
  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
