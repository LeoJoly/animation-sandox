<script setup lang="ts">
interface ControlsProps {
  autoRotate: boolean
  time: number
}
defineProps<ControlsProps>()
defineEmits(['set-speed-down', 'set-speed-up', 'toggle-auto-rotate'])
</script>

<template>
  <div class="c-controls">
    <p class="c-controls__time">
      {{ time < 1 ? `${time.toFixed(2)} year` : `${time.toFixed(2)} years` }}
    </p>
    <div class="c-controls__wrapper">
      <button class="c-controls__button" @click="$emit('set-speed-down')">
        Speed down
      </button>
      <button :class="['c-controls__button', { '-on': autoRotate }]" @click="$emit('toggle-auto-rotate')">
        Auto-rotate
      </button>
      <button class="c-controls__button" @click="$emit('set-speed-up')">
        Speed up
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-controls {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  z-index: 1;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  transform: translateX(-50%);

  &__time {
    font-size: 3rem;
    line-height: 3.8rem;
    text-align: center;
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  &__button {
    padding: 0.5rem 1.5rem;
    background-color: #4F4D8C;
    border-radius: .6rem;
    cursor: pointer;
    transition: all .2s ease;

    &.-on {
      background-color: #8F8EBF;
    }

    &:hover {
      background-color: #474073;
    }
  }


}
</style>
