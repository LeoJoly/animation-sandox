<script setup lang="ts">
import { Camera, GltfModel, PointLight, Renderer, Scene, SpotLight } from 'troisjs'
import { POSITIONS } from '@/scripts/constants'

/** State */
const positionIndex = ref(0)
const isModelReady = ref(false)
const camera = ref<null | typeof Camera>(null)
const model = ref<null | typeof GltfModel>(null)
const renderer = ref<null | typeof Renderer>(null)

/** Computed */
const cameraPos = computed(() => {
  return POSITIONS[positionIndex.value].camera
})

const modelPos = computed(() => {
  return POSITIONS[positionIndex.value].model
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
  if (!isModelReady.value) return
  if (positionIndex.value === POSITIONS.length - 1) return
  positionIndex.value++
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