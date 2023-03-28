<script setup lang="ts">
import gsap from 'gsap'
import { Camera, GltfModel, PointLight, Renderer, Scene, SpotLight } from 'troisjs'
import { POSITIONS } from '@/scripts/constants'

/** State */
const positionIndex = ref(0)
const isModelReady = ref(false)
const modelCanMove = ref(true)
const renderer = ref<null | typeof Renderer>(null)
const camera = ref<null | typeof Camera>(null)
const cameraPos = ref({ x: 0, y: 0, z: 0 })
const model = ref<null | typeof GltfModel>(null)
const modelPos = ref({ x: 0, y: 0, z: 0 })
const modelRotationY = ref(0)

onMounted(() => {
  cameraPos.value = POSITIONS[positionIndex.value].camera
  modelPos.value = POSITIONS[positionIndex.value].model
})

/** Methods */
const onReady = () => {
  isModelReady.value = true
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.log('error', error)
}

const onClick = () => {
  if (!isModelReady.value || !modelCanMove.value) return

  if (positionIndex.value < POSITIONS.length - 1) {
    positionIndex.value++
    animate()
  } else {
    rotate()
    modelCanMove.value = false
  }
}

const animate = () => {
  gsap.to(cameraPos.value, {
    x: POSITIONS[positionIndex.value].camera.x,
    y: POSITIONS[positionIndex.value].camera.y,
    z: POSITIONS[positionIndex.value].camera.z,
    duration: 1,
    ease: 'power2.out'
  })

  gsap.to(modelPos.value, {
    x: POSITIONS[positionIndex.value].model.x,
    y: POSITIONS[positionIndex.value].model.y,
    z: POSITIONS[positionIndex.value].model.z,
    duration: 1,
    ease: 'power2.out'
  })
}

const rotate = () => {
  if (!isModelReady.value || !renderer.value) return

  renderer.value.onBeforeRender(() => {
    if (!model.value) return
    modelRotationY.value += 0.01
  })
}
</script>

<template>
  <div class="c-polygone">
    <ClientOnly>
      <Renderer ref="renderer" resize="window" orbit-ctrl @click="onClick">
        <Camera ref="camera" :position="cameraPos" />
        <Scene background="#000000">
          <!-- Red lights -->
          <PointLight color="#EB1006" :position="{ x: 100, y: 0, z: 40 }" :intensity="1" />
          <!-- Blue lights -->
          <PointLight color="#00CDEA" :position="{ x: -100, y: 0, z: 40 }" :intensity="1" />
          <!-- White light -->
          <SpotLight color="#FFFFFF" :position="{ x: 0, y: 500, z: 300 }" :intensity="0.6" />
          <SpotLight color="#FFFFFF" :position="{ x: 0, y: -500, z: 0 }" :intensity="0.4" />
          <GltfModel
            ref="model"
            src="/models/mario/mario.gltf"
            :position="modelPos"
            :rotation="{ x: 0, y: modelRotationY, z: 0 }"
            @load="onReady"
            @error="onError"
          />
        </Scene>
      </Renderer>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.c-polygone {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.c-model-control {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  background-color: rgba($color: #fff, $alpha: 0.6);
  border-radius: .5rem;
}
</style>