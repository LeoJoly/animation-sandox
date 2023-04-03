import { Position } from '@/scripts/types/planet'

export default (position: Position, scale: number): Position => {
  return {
    x: position.x * scale,
    y: position.y * scale,
    z: position.z * scale
  }
}