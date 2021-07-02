import React, { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'


import Card from '@/components/Card'

import { StyledContainer } from './styles'


const Test = () => {

  const containerRef = useRef()

  let camera, scene, renderer;
  let geometry, material, mesh;

  useEffect(() => {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    // renderer.setAnimationLoop( animation );
    // containerRef.current.appendChild( renderer.domElement );

  }, [])


  return (
    <StyledContainer ref={containerRef}>
      <Card/>
    </StyledContainer>
  )
}

export default Test
