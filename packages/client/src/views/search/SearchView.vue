<template>
  <div class="search-view">
    <Search
      ref="searchRef"
      show-action
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="emits('cancel')"
    ></Search>

    <div v-if="!searchValue" class="search-view__history">
      <div class="label">历史搜索</div>
      <!-- transtion-group与transtion类似, 但支持多个元素 -->
      <TransitionGroup name="list">
        <div
          class="history-tag"
          v-for="v in historyTags"
          :key="v"
          @click="onTagClick(v)"
        >
          {{ v }}
        </div>
        <div class="history-tag" @click="setIsHistoryTagShown" key="arrow">
          <VanIcon v-if="isHistoryTagShown" name="arrow-up"></VanIcon>
          <VanIcon v-else name="arrow-down"></VanIcon>
        </div>
      </TransitionGroup>
    </div>

    <div v-else class="search-view__result">
      <div class="searching" v-if="searchState === DOING">~正在搜索</div>
      <template v-if="searchState === DONE">
        <div class="result-item" v-for="v in searchResult" :key="v.label">
          <VanIcon name="search"></VanIcon>
          <div class="name">{{ v.label }}</div>
          <div class="count">{{ v.resultCount }}个结果</div>
        </div>
        <div class="no-result" v-if="!searchResult.length">~暂无推荐</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ISearchResult } from '@/types'
import { ref, computed, watch, onMounted } from 'vue'
import Search from '@/components/Search.vue'
import { fetchSearchData } from '@/api/search'
import { useToggle } from '@/use/useToggle'
import { useDebounceWatch } from '@/use/useDebounce'

interface IEmits {
  (e: 'cancel'): void
}
const emits = defineEmits<IEmits>()

const HISTORY_TAGS = [
  '比萨',
  '栗子',
  '切果NOW',
  '炒饭',
  '出前一丁',
  '牛腩',
  '土豆焗饭',
  '烧烤',
  '水果'
]
const [isHistoryTagShown, setIsHistoryTagShown] = useToggle(false)
const historyTags = computed(() =>
  isHistoryTagShown.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5)
)
const searchValue = ref<string>('')
const [INIT, DONE, DOING] = [-1, 0, 1]
const searchState = ref<number>(INIT)
const searchResult = ref<ISearchResult[]>([])
const searchRef = ref<InstanceType<typeof Search> | null>(null)

onMounted(() => searchRef?.value?.focus())

const onSearch = async (v?: string | number) => {
  searchState.value = DOING
  const { list } = await fetchSearchData(v as string).catch((e) => e)
  searchResult.value = list
  searchState.value = DONE
}

const onTagClick = (v: string) => {
  searchValue.value = v
  // onSearch(v)
}

const debounceSearchValue = useDebounceWatch(searchValue, 1000)
watch(debounceSearchValue, (n) => {
  if (!n) return (searchResult.value = [])
  onSearch(n)
})
</script>

<style lang="scss">
.search-view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;

  &__history {
    padding: var(--van-padding-sm);
    .label {
      margin-bottom: var(--van-padding-xs);
    }
    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
  }

  &__result {
    .result-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 1px solid var(--van-gray-1);
      .name {
        flex: 1;
        padding-left: 6px;
      }
      .count {
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }
    .no-result,
    .searching {
      font-size: 12px;
      padding: 100px 0;
      text-align: center;
      color: var(--van-gray-6);
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
