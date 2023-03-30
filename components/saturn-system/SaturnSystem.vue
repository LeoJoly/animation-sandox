<script setup lang="ts">
import Scene from '@/scripts/class/scene.class'
import Planet from '@/scripts/class/planet.class'
import data from '@/assets/data'
import { PlanetOptions, SateliteOptions } from '@/scripts/types/planet'

/** State */
let scene: Scene
let saturn: Planet
const scale = 1 / 1000
const wrapper = ref<HTMLCanvasElement | null>(null)

/** Lifecycle */
onMounted(() => {
  if (!wrapper.value) return
  scene = new Scene(wrapper.value, '#0D070A')
  saturn = new Planet(data.saturn as SateliteOptions, scale)

  if (saturn.shape) scene.addElement(saturn.shape)

  data.satelites.forEach((satelite) => {
    const satelitePlanet = new Planet(satelite as SateliteOptions, scale, data.saturn.radius)
    if (satelitePlanet.shape) scene.addElement(satelitePlanet.shape)
  })
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
