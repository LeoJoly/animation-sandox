import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const useGLTFModel = () => {
  const gltfLoader = new GLTFLoader()

  const loadModel = (url: string): Promise<GLTF> => {
    return new Promise((resolve, reject) => {
      gltfLoader.load(url, resolve, undefined, reject)
    })
  }

  return { loadModel }
}