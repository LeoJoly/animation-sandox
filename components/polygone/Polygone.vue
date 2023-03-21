<script setup lang="ts">
import {
  PointLight,
  Box,
  Camera,
  Renderer,
  Scene,
  LambertMaterial
} from 'troisjs'

/** Template refs */
const renderer = ref<null | typeof Renderer>(null)
const box = ref<null | typeof Box>(null)

onMounted(() => {
  nextTick(() => {
    renderer?.value?.onBeforeRender(() => {
      if (!box?.value) return
      box.value.mesh.rotation.x += 0.01
    })
  })
})
</script>

<template>
  <ClientOnly>
    <div class="c-polygone">
      <Renderer ref="renderer" resize="window" orbit-ctrl>
        <Camera :position="{ z: 3 }" />
        <Scene background="#4DBA87">
          <PointLight :position="{ y: 50, z: 50 }" />
          <Box ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
            <LambertMaterial />
          </Box>
        </Scene>
      </Renderer>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.c-polygone {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>