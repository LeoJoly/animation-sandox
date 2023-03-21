<script setup lang="ts">
import { Camera, GltfModel, PointLight, Renderer, Scene, SpotLight } from 'troisjs'

/** State */
const cameraPos = reactive({ x: 0, y: 0, z: 3 })
const isModelReady = ref(false)
const modelPos = reactive({ x: 0, y: -0.5, z: 0 })

/** Template refs */
const camera = ref<null | typeof Camera>(null)
const model = ref<null | typeof GltfModel>(null)
const renderer = ref<null | typeof Renderer>(null)

const onReady = () => {
  isModelReady.value = true
}

const onError = (error: Error) => {
  console.log('error', error)
}

onMounted(() => {
  nextTick(() => {
    if (!renderer.value) return
    const orbitCtrl = renderer.value.three.cameraCtrl
    orbitCtrl.addEventListener('change', () => {
      const { x, y, z } = orbitCtrl.object.position
      cameraPos.x = x
      cameraPos.y = y
      cameraPos.z = z
    })
  })
})
</script>

<template>
  <div class="c-polygone">
    <ClientOnly>
      <Renderer ref="renderer" resize="window" orbit-ctrl>
        <Camera ref="camera" :position="{ z: 3 }" />
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
    <div class="c-model-control">
      <form>
        <p>Position:</p>
        <div>
          <label for="modelPosX">X {{ modelPos.x }}</label>
          <input
            id="modelPosX"
            v-model="modelPos.x"
            type="range"
            name="modelPosX"
            min="-5"
            max="5"
            step="0.1"
          >
        </div>
        <div>
          <label for="modelPosY">Y {{ modelPos.y }}</label>
          <input
            id="modelPosY"
            v-model="modelPos.y"
            type="range"
            name="modelPosY"
            min="-5"
            max="5"
            step="0.1"
          >
        </div>
        <div>
          <label for="modelPosZ">Z {{ modelPos.z }}</label>
          <input
            id="modelPosZ"
            v-model="modelPos.z"
            type="range"
            name="modelPosZ"
            min="-5"
            max="5"
            step="0.1"
          >
        </div>
        <div>
          <p>Camera:</p>
          <p>X: {{ cameraPos.x }} | Y: {{ cameraPos.y }} | Z: {{ cameraPos.z }}</p>
        </div>
      </form>
    </div>
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