<script setup lang="ts">
import Scene from '@/scripts/class/scene.class'
import { Planet } from '~~/scripts/class/planet.class.js'
import data from '@/assets/data'
import { PlanetOptions } from '@/scripts/types/planet'

/** State */
let scene: Scene
const planets: Planet[] = []
const scale = 1 / 2
const autoRotate = ref(false)
const speed = ref(0.05)
const time = ref(0)
const wrapper = ref<HTMLCanvasElement | null>(null)

watch(autoRotate, (val) => {
  if (scene) scene.autoRotate = val
})

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
  scene.renderer?.clear()
})

const displayPlanet = (p: PlanetOptions) => {
  const planet = new Planet(p as PlanetOptions, scale)
  if (planet.mainGroup) scene.addElement(planet.mainGroup)
  planets.push(planet)
}

const initScene = () => {
  if (!wrapper.value) return
  if (!scene) scene = new Scene(wrapper.value, autoRotate.value)
}

const loopCallback = () => {
  planets.forEach((planet) => {
    if (planet.planetGroup && planet.rotationSpeed)
      planet.planetGroup.rotation.y += (360 * Math.PI / 180) * 1 / planet.rotationSpeed * speed.value

    if (planet.mainGroup && planet.orbitSpeed)
      planet.mainGroup.rotation.y += (360 * Math.PI / 180) * speed.value / planet.orbitSpeed

    time.value += 360 * Math.PI / 180 * speed.value / 365.25 * Math.PI / 180
  })
}
</script>

<template>
  <div class="c-solar-system">
    <div ref="wrapper" class="c-solar-system__wrapper" />
    <Controls
      :auto-rotate="autoRotate"
      :time="time"
      @set-speed-down="speed = speed / 1.5"
      @set-speed-up="speed = speed * 1.5"
      @toggle-auto-rotate="autoRotate = !autoRotate"
    />
  </div>
</template>

<style lang="scss" scoped>
.c-solar-system {
  position: relative;
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
