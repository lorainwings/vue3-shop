import { Ref, UnwrapRef, onUnmounted } from 'vue'
import { ref, watch, customRef } from 'vue'

interface IDebounceFn<T> {
  (...args: T[]): void | Promise<void>
}
/* 这并不是hooks, 因为并没有用到ref或者其他hooks */
export function useDebounceUtil<T>(fn: IDebounceFn<T>, delay: number) {
  let timer: number | null = null
  return function f(...args: T[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

/* 实现真正意义的防抖hooks */
export function useDebounceWatch<T>(v: Ref<T>, delay: number) {
  let timer: number | null = null
  const debounceValue = ref(v.value)

  const unWatch = watch(v, (n) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      debounceValue.value = n as UnwrapRef<T>
    }, delay)
  })

  onUnmounted(unWatch)
  return debounceValue
}

/* 使用customRef来实现防抖hooks */
export function useDebounceCustomRef<T>(value: T, delay: number) {
  let timer: number | null = null
  return customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(n: T) {
      const setFn = () => ((value = n), trigger())
      if (timer) clearTimeout(timer)
      timer = setTimeout(setFn, delay)
    }
  }))
}
