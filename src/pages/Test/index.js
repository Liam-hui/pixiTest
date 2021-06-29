import React, { useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'


import { StyledContainer } from './styles'

function Test() {

  const containerRef = useRef()
  const appRef = useRef()

  // const { x } = useSpring({ from: { x: 0 }, x: 1, config: { duration: 1000 } })

  useEffect(() => {
    const app = new PIXI.Application()
    appRef.current = app
    containerRef.current.appendChild(app.view)

    const container = new PIXI.Container()
    app.stage.addChild(container)

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        const square = new PIXI.Sprite(PIXI.Texture.WHITE)
        square.tint = 0xff0000
        square.width = 50
        square.height = 50
        square.x = x * 100
        square.y = y * 100
        square.angle = 30
        container.addChild(square)
      }
    }

    app.ticker.add((delta) => {
      for (const square of container.children) {
        square.angle += 1 * delta
      }
      // container.rotation -= 0.01 * delta;
  });

  }, [])

  return (
    <StyledContainer ref={containerRef}>
      asdfasdf
    </StyledContainer>
  );
}

export default Test
