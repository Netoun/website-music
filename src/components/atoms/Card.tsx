import { styled } from '@stitches/react'

const Card = styled('div', {
  boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
  borderRadius: '50px',
  padding: '$3',
  backdropFilter: 'blur(20px) opacity(30%)',
})

export default Card
