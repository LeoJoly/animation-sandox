<script setup lang="ts">
import Scene from '@/scripts/class/scene.class'
import { Planet, Satelite } from '~~/scripts/class/astra.class'
import data from '@/assets/data'
import { PlanetOptions, SateliteOptions } from '@/scripts/types/planet'

/** State */
let scene: Scene
const scale = 1 / 10000
const wrapper = ref<HTMLCanvasElement | null>(null)

/** Lifecycle */
onMounted(() => {
  initScene()
  data.planets.forEach((planet) => {
    displayPlanet(planet as PlanetOptions)
  })
  // displaySaturn()
  // displaySatelites()
  scene.loop()
})

onBeforeUnmount(() => {
  scene.unbindEvents()
})

/** Methods */
// const displaySatelites = () => {
//   data.satelites.forEach((satelite) => {
//     const satelitePlanet = new Satelite(satelite as SateliteOptions, scale, data.saturn.radius)
//     if (satelitePlanet.shape) scene.addElement(satelitePlanet.shape)
//   })
// }

const displayPlanet = (p: PlanetOptions) => {
  const planet = new Planet(p as PlanetOptions, scale)
  if (planet.group) scene.addElement(planet.group)
}

const initScene = () => {
  if (!wrapper.value) return
  if (!scene) scene = new Scene(wrapper.value)
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
    background-image: url('@/assets/milky-way.jpg');
    background-size: cover;
    border-radius: 1rem;
  }
}
</style>
