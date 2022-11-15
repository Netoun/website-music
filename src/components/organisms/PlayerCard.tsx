import { styled } from '@stitches/react'
import Card from '../atoms/Card'
import Kirby from '../../assets/kirby.png'
import { useRect } from '../../hooks/useRect'
import { useState } from 'react'
import Image from '../atoms/Image'

const Wrapper = styled('div', {
  position: 'relative',

  'img:first-child': {
    position: 'absolute',
    opacity: 0.75,
    filter: 'blur(25px)',
  },

  'img:last-child': {
    position: 'absolute',
  },
})

const StyledPlayerCard = styled(Card, {
  position: 'relative',
  width: '600px',
  height: '150px',
  transformStyle: 'preserve-3d',
  touchAction: 'none',

  [`& ${Wrapper}`]: {
    marginTop: '-5%',
    marginLeft: '20px',
  },

  // '&:hover': {
  //   transform: `rotateX(calc((var(--ratio-y) - 0.5) * 25deg))
  //               rotateY(calc((var(--ratio-x) - 0.5) * -20deg))`,
  // },

  // '&:not(:hover)': {
  //   transform: `rotateX(0deg) rotateY(0deg)`,
  //   transition: 'transform 0.2s',
  // },

  // '& img': {
  //   borderRadius: '28px',
  //   transform: 'translateY(-25%)',
  //   height: '150px',
  // },
})

const PlayerCard = () => {
  const [rect, ref] = useRect<HTMLDivElement>()

  const [ratio, setRatio] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const handlePointerMove = (x: number, y: number) => {
    if (rect) {
      const posX = x - rect.x
      const posY = y - rect.y
      setRatio({
        x: posX / rect.width,
        y: posY / rect.height,
      })
    }
  }

  return (
    <StyledPlayerCard
      ref={ref}
      onPointerMove={(e) => handlePointerMove(e.clientX, e.clientY)}
      css={{
        '--ratio-y': ratio.x,
        '--ratio-x': ratio.y,
      }}
    >
      <Wrapper>
        <Image src={Kirby} />
        <Image src={Kirby} />
      </Wrapper>
    </StyledPlayerCard>
  )
}

export default PlayerCard
