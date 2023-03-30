import { ColorRepresentation } from 'three'

export type Position = {
  x: number,
  y: number,
  z: number
}

export type PlanetOptions = {
  name: string,
  radius: number,
  position?: Position,
  texture?: string
  color?: ColorRepresentation
}

export type SateliteOptions = PlanetOptions & {
  distance: number,
  tilt: number
}