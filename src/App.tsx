import { styled } from '@stitches/react'
import PlayerCard from './components/organisms/PlayerCard'
import { useTheme } from './theme'

const StyledApp = styled('main', {
  height: '100%',
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',
})

function App() {
  const { theme } = useTheme()
  return (
    <StyledApp className={theme.className}>
      <PlayerCard />
    </StyledApp>
  )
}

export default App
