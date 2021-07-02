import React, { useState, useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'


import { 
  CardContainer,
  CardImage,
  CardCanvas
} from './styles'

const SQUARE_SIZE = 5

const Card = () => {

  const [isDrawing, setIsDrawing] = useState(false)

  const canvasContainerRef = useRef()
  const appRef = useRef()
  const containerRef = useRef()
  const imageRef = useRef()

  useEffect(() => {
    imageRef.current.onload = () => {
      draw()
    }
  }, [])

  let progress
  const draw = () => {
    setIsDrawing(true)

    const app = new PIXI.Application({        
      antialias: true,    
      transparent: true,
      resolution: 1,
    });
    app.renderer.autoResize = true
    appRef.current = app
    canvasContainerRef.current.appendChild(app.view)
    app.resizeTo = canvasContainerRef.current

    const container = new PIXI.Container()
    containerRef.current = container
    app.stage.addChild(container)

    const image = imageRef.current
    const isWide = image.naturalWidth / image.naturalHeight > image.width / image.height 
    const adjustedHeight = isWide ? image.naturalHeight : image.naturalWidth * image.height / image.width
    const adjustedWidth = isWide ? image.naturalHeight * image.width / image.height : image.naturalWidth

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(
      image, // source
      (image.naturalWidth - adjustedWidth) * 0.5,  // source_start_x
      (image.naturalHeight - adjustedHeight) * 0.5, // source_start_y
      adjustedWidth, // source_width
      adjustedHeight, // source_height
      0, // canvas_start_x
      0, // canvas_start_y
      image.width, // draw_width
      image.height // draw_height
    )

    // greyscale
    const imgData = ctx.getImageData(0, 0, image.width, image.height)
    const pixels = imgData.data
    for (let i = 0; i < pixels.length; i += 4) {
      const greyscale = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3)
      pixels[i] = greyscale
      pixels[i + 1] = greyscale
      pixels[i + 2] = greyscale
    }
    const canvasGreyscale = canvas.cloneNode(false)
    canvasGreyscale.getContext('2d').putImageData(imgData, 0, 0)

    const baseTexture = PIXI.BaseTexture.from(canvas)
    const baseTextureGreyscale = PIXI.BaseTexture.from(canvasGreyscale)

    for (let x = 0; x < Math.floor(image.width / SQUARE_SIZE); x++) {
      for (let y = 0; y < Math.floor(image.height / SQUARE_SIZE); y++) {
        const textureFrame = new PIXI.Rectangle(
          x * SQUARE_SIZE, 
          y * SQUARE_SIZE, 
          SQUARE_SIZE, 
          SQUARE_SIZE, 
        )

        const texture = new PIXI.Texture(baseTexture, textureFrame)
        const color = new PIXI.Sprite(texture)
        color.width = SQUARE_SIZE
        color.height = SQUARE_SIZE

        const textureGreyscale = new PIXI.Texture(baseTextureGreyscale, textureFrame)
        const greyscale = new PIXI.Sprite(textureGreyscale)
        greyscale.width = SQUARE_SIZE
        greyscale.height = SQUARE_SIZE
      
        const square = new PIXI.Container()
        square.width = SQUARE_SIZE
        square.height = SQUARE_SIZE
        square.x = (canvasContainerRef.current.offsetWidth - image.width) * 0.5 + x * SQUARE_SIZE
        square.y = (canvasContainerRef.current.offsetHeight - image.height) * 0.5 + y * SQUARE_SIZE
        square.startX = square.x + (Math.random() * 2 - 1) * SQUARE_SIZE * 5
        square.posX = square.x
        square.posY = square.y
        square.dirX = - Math.random() * 4
        square.dirY = (Math.random() * 2 - 1) * 1.7

        square.addChild(color, greyscale)

        containerRef.current.addChild(square)
      }
    }

    progress = (canvasContainerRef.current.offsetWidth - image.width) * 0.5
    appRef.current.ticker.add((delta) => {
      let isFinished = true
      for (const square of containerRef.current.children) {
        progress += image.width * 0.000007
        if (square.isStarted && !square.isStopped) {
          square.x += delta * square.dirX
          square.y += delta * square.dirY
        }
        if (progress > square.startX) {
          square.isStarted = true
        }
        if (progress > square.startX + 200 && !square.isChanged) {
          square.isChanged = true
          square.dirX *= -1.8
          square.dirY *= -1.8
        }
        // if (square.isChanged && square.children[1].alpha > 0) {
        //   square.children[1].alpha -= 0.1
        // }
        if (square.isStarted && square.children[1].alpha > 0) {
          square.children[1].alpha -= 0.025
        }
        if (square.isChanged && Math.abs(square.posX - square.x) < Math.abs(square.dirX) && Math.abs(square.posY - square.y) < Math.abs(square.dirY)) {
          square.isStopped = true
          square.x = square.posX
          square.y = square.posY
        }

        if (!square.isStopped) isFinished = false
      }
      if (isFinished) {
        console.log('asdfasdf')
        appRef.current.ticker.stop()
        appRef.current.destroy(true)
        appRef.current.stage = null
        setIsDrawing(false)
      }
    })
  }

  return (
    <CardContainer>
      {isDrawing &&
        <CardCanvas ref={canvasContainerRef}/>
      }
      <CardImage ref={imageRef} style={{ opacity: isDrawing ? 0 : 1 }} src={require('@/assets/images/test5.jpg').default}/>

    </CardContainer>
  )
}

export default Card
