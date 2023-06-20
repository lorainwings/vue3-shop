<template>
  <div class="scroll-bar">
    <div class="scroll-bar__swipe">
      <div ref="containerRef">
        <div class="swipe-item" v-for="v in props.data" :key="v.type">
          <div class="scroll-bar__info" :class="`scroll-bar__info__${v.type}`">
            <span class="info-badge">{{ v.type }}</span>
            <span class="info-detail" v-html="v.detail"></span>
            <span class="info-btn op-thin-border">{{ v.btn }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IScrollBarInfo } from '@/types'
import { ref, onMounted } from 'vue'
import { useInterval } from '@/use/useInterval'

interface IProps {
  intervalTime?: number
  transitionTime?: number
  height?: number
  data: IScrollBarInfo[]
}

const props = withDefaults(defineProps<IProps>(), {
  intervalTime: 3000,
  transitionTime: 1000,
  height: 40
})
const heightPx = `${props.height}px`
const containerRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const container = containerRef.value as HTMLDivElement
  const count = container.children.length
  const [firstSwipeItem] = container.children
  container.style.height = `${count * props.height}`
  let index = 0
  useInterval(() => {
    index++

    // 到最后一个元素时, 将第一个元素移动到最后
    if (index >= count) {
      ;(firstSwipeItem as HTMLDivElement).style.transform = `translateY(${
        index * props.height
      }px)`
      // 第一个滚动结束后, 整个container位置重置
      // 此处无法使用useTimeout的hooks, Vue3中, onMounted在异步中调用会抛出警告, 因此此处改为原生setTimeout

      // [Vue warn]: onUnmounted is called when there is no active component instance to be associated with.
      // Lifecycle injection APIs can only be used during execution of setup().
      // If you are using async setup(), make sure to register lifecycle hooks before the first await statement.
      const clear = setTimeout(() => {
        ;(firstSwipeItem as HTMLDivElement).style.transform = ''
        container.style.transform = ''
        container.style.transition = ''
        clearTimeout(clear)
      }, props.transitionTime)
    }
    container.style.transform = `translateY(-${index * props.height}px)`
    container.style.transition = `all linear ${props.transitionTime}ms`
    index = index % count
  }, props.intervalTime)
})
</script>

<style lang="scss" scoped>
.scroll-bar {
  --bean-color: rgb(252, 164, 40);
  --hongbao-color: rgb(252, 68, 25);
  --suprise-color: rgb(2, 200, 250);
  &__swipe {
    background: white;
    border-radius: 8px;
    margin: 5px 10px;
    font-size: 13px;
    position: relative;
    overflow: hidden;
    height: v-bind(heightPx);
    .swipe-item {
      height: v-bind(heightPx);
    }
  }
  .scroll-bar__info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
    height: 100%;

    .info-badge {
      border-radius: 5px;
      padding: 2px 6px;
      color: white;
      margin-right: 6px;
      font-size: 12px;
    }
    .info-detail {
      flex: 1;
    }
    .info-btn {
      padding: 3px 14px;
      font-size: 12px;
      &.op-thin-border:before {
        border-radius: 50px;
      }
    }

    .info-num {
      font-weight: bold;
      margin: 0 2px;
    }

    &__bean {
      .info-badge {
        background: var(--bean-color);
      }
      .info-btn {
        color: var(--bean-color);
        &:before {
          border-color: var(--bean-color);
        }
      }
      .info-num {
        color: var(--bean-color);
      }
    }

    &__redbag {
      .info-badge {
        background: var(--hongbao-color);
      }
      .info-btn {
        color: var(--hongbao-color);
        &:before {
          border-color: var(--hongbao-color);
        }
      }
      .info-num {
        color: var(--hongbao-color);
      }
    }
    &__suprise {
      .info-badge {
        background: var(--suprise-color);
      }
    }
  }
}
</style>
