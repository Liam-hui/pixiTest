import React, { useState, useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Background from '../Background'


import { Container } from './styles'


function Main() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => {
    gl.autoClear = true
    gl.render(scene.current, camera)
  }, 100)
  return (
    <scene ref={scene}>
      {/* <color attach="background" args={["white"]}/>   */}

      <mesh
        position={[1.2, 0, 0]}
        scale={1}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh> 

    </scene>
  )
}

function HeadsUpDisplay() {
  const scene = useRef()
  const { camera } = useThree()
  // const windowSize = useWindowSize()
  // const camera = new THREE.OrthographicCamera(windowSize.width / -2, windowSize.width / 2, windowSize.height / 2, windowSize.height / -2, 1 ,1000);
  useFrame(({ gl }) => {
    gl.autoClear = false
    gl.clearDepth()
    gl.render(scene.current, camera)
  }, 10)
  return (
    <scene ref={scene}>
      <mesh
        position={[-3, 0, 0]}
        scale={1}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'red'} />
      </mesh> 
    </scene>
  )
}

const ThreeCanvas = () => {

  useEffect(() => {
  }, [])
  
  // const camera = useRef()
  // const { size, setDefaultCamera } = useThree()
  // useEffect(() => void setDefaultCamera(camera.current), [])
  // useFrame(() => camera.current.updateMatrixWorld())

  return (
    <Container>
      <Canvas orthographic>
        <Background/>
      {/* <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        radius={(size.width + size.height) / 4}
        onUpdate={self => self.updateProjectionMatrix()}
      /> */}
      {/* <Main /> */}
      {/* <HeadsUpDisplay /> */}

      </Canvas>
    </Container>
  )
}

export default ThreeCanvas
