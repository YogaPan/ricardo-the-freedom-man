import React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'
import PlayButton from './components/PlayButton'
import ContentSection from './components/ContentSection'
import CanvasSection from './components/CanvasSection'
import useFadeIn from './hooks/useFadeIn'

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #000;
  color: white;
`

const Title = styled.h1`
  font-size: 150px;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 10px;
`

const App: React.FC = () => {
  const props = useFadeIn()
  return (
    <Container>
      <animated.div style={props}>
        <Title>Ricardo</Title>
        <PlayButton />
      </animated.div>
      <ContentSection />
      <CanvasSection />
    </Container>
  )
}

export default App
