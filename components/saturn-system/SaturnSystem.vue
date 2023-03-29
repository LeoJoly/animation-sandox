<script setup lang="ts">
import Scene from '@/scripts/class/scene.class'

/** State */
let scene: Scene
const wrapper = ref<HTMLCanvasElement | null>(null)

/** Lifecycle */
onMounted(() => {
  if (!wrapper.value) return
  scene = new Scene(wrapper.value, '#0D070A')
})

onBeforeUnmount(() => {
  scene.unbindEvents()
})
</script>

<template>
  <div class="c-saturn-system">
    <div ref="wrapper" class="c-saturn-system__wrapper" />
  </div>
</template>

<style lang="scss" scoped>
.c-saturn-system {
  height: 100vh;
  width: 100vw;
  padding: 2rem;

  &__wrapper {
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 1rem;
  }
}
</style>
