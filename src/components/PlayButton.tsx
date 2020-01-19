import React from 'react'
import styled from 'styled-components'
import { ReactComponent as BasePlayIcon } from '../assets/play.svg'

const Container = styled.span`
  vertical-align: 'middle';
  display: flex;
  align-items: center;
  justify-content: center;

  > *:first-child {
    margin-right: 8px;
  }

  &:hover {
    cursor: pointer;
    span {
      text-decoration: underline;
    }
  }
`

const PlayIcon = styled(BasePlayIcon)`
  fill: white;
  height: 28px;
  width: 28px;
`

const PlayButton = () => {
  return (
    <Container>
      <span style={{ fontSize: 22 }}>觀看影片</span>
      <PlayIcon />
    </Container>
  )
}

export default PlayButton
