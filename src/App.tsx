import React from 'react'
import styled from 'styled-components'
import PlayButton from './components/PlayButton'

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
  return (
    <Container>
      <Title>Ricardo</Title>
      <PlayButton />
    </Container>
  )
}

export default App
