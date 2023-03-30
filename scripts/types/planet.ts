import { ColorRepresentation } from 'three'

export type Position = {
  x: number,
  y: number,
  z: number
}

export type AstraOptions = {
  name: string,
  radius: number,
  color?: ColorRepresentation
}

export type PlanetOptions = AstraOptions & {
  position?: Position
  texture?: string
}

export type SateliteOptions = AstraOptions & {
  distance?: number
  tilt?: number
}