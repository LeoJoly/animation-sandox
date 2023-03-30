<script setup lang="ts">
import Scene from '@/scripts/class/scene.class'
import { Planet, Satelite } from '~~/scripts/class/astra.class'
import data from '@/assets/data'
import { PlanetOptions, SateliteOptions } from '@/scripts/types/planet'

/** State */
let scene: Scene
const scale = 1 / 1000
const wrapper = ref<HTMLCanvasElement | null>(null)

/** Lifecycle */
onMounted(() => {
  initScene()
  displaySaturn()
  // displaySatelites()
  scene.loop()
})

onBeforeUnmount(() => {
  scene.unbindEvents()
})

/** Methods */
const displaySatelites = () => {
  data.satelites.forEach((satelite) => {
    const satelitePlanet = new Satelite(satelite as SateliteOptions, scale, data.saturn.radius)
    if (satelitePlanet.shape) scene.addElement(satelitePlanet.shape)
  })
}

const displaySaturn = () => {
  const saturn = new Planet(data.saturn as PlanetOptions, scale)
  if (saturn.group) scene.addElement(saturn.group)
}

const initScene = () => {
  if (!wrapper.value) return
  if (!scene) scene = new Scene(wrapper.value, '#0D070A')
}
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
