import React, { useState, useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Flex, Box, useFlexSize } from '@react-three/flex'
import useWindowSize from '@/hooks/useWindowSize'
import { Container } from './styles'

const POINT_SIZE = 20

const Squares = () => {
  const [width, height] = useFlexSize()

  const positions = useMemo(() => {
    let positions = []
    console.log(width)
    for (let x = 0; x < width / POINT_SIZE; x++) 
      for (let y = 0; y < height / POINT_SIZE; y++) {
        positions.push(- width * 0.5 + x * POINT_SIZE)
        positions.push(- height * 0.5 + y * POINT_SIZE)
        positions.push(0)
      }
    return new Float32Array(positions)
  }, [width, height])

  return (
    <>
      {positions.length > 0 && 
        <points>
          <bufferGeometry args={[width, height]} attach="geometry">
            <bufferAttribute attachObject={["attributes", "position"]} count={positions.length / 3} array={positions} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial attach="material" vertexColor color='black' size={POINT_SIZE} sizeAttenuation={false} />
        </points>
      }
    </>

    // <mesh receiveShadow>
    //   <planeBufferGeometry attach="geometry" args={[width, height]} />
    //   <meshBasicMaterial attach="material" color="red" />
    // </mesh>
  )
}

const Background = () => {

  useEffect(() => {
  }, [])
  
  const { viewport } = useThree()

  return (
    <Flex dir="column" position={[-viewport.width / 2, viewport.height / 2, 0]} size={[viewport.width, viewport.height, 0]} >
      <Box width="auto" height="auto" flexGrow={1} centerAnchor>
        <Squares/>
      </Box>
    </Flex>
  )
}

export default Background
