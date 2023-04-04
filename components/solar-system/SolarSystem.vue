<script setup lang="ts">
import Scene from '@/scripts/class/scene.class'
import { Planet } from '~~/scripts/class/planet.class.js'
import data from '@/assets/data'
import { PlanetOptions } from '@/scripts/types/planet'

/** State */
let scene: Scene
const planets: Planet[] = []
const scale = 1 / 2
const wrapper = ref<HTMLCanvasElement | null>(null)

/** Lifecycle */
onMounted(() => {
  initScene()
  data.planets.forEach((planet) => {
    displayPlanet(planet as PlanetOptions)
  })

  scene.loop(loopCallback)
})

onBeforeUnmount(() => {
  scene.unbindEvents()
})

const displayPlanet = (p: PlanetOptions) => {
  const planet = new Planet(p as PlanetOptions, scale)
  if (planet.mainGroup) scene.addElement(planet.mainGroup)
  planets.push(planet)
}

const initScene = () => {
  if (!wrapper.value) return
  if (!scene) scene = new Scene(wrapper.value)
}

const loopCallback = () => {
  planets.forEach((planet) => {
    if (!planet.mainGroup) return
    planet.mainGroup.rotation.y += 0.001
  })
}
</script>

<template>
  <div class="c-solar-system">
    <div ref="wrapper" class="c-solar-system__wrapper" />
  </div>
</template>

<style lang="scss" scoped>
.c-solar-system {
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
