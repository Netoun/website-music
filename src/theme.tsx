import { createStitches, globalCss } from '@stitches/react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export const { createTheme } = createStitches({
  theme: {
    space: {
      1: '5px',
      2: '10px',
      3: '15px',
    },
    fontSizes: {
      1: '12px',
      2: '13px',
      3: '15px',
    },
    fonts: {
      untitled: 'Untitled Sans, apple-system, sans-serif',
      mono: 'Söhne Mono, menlo, monospace',
    },

    shadows: {
      1: '0.5px 1px 1px hsl(0deg 0% 50% / 0.7)',
      2: `1px 2px 2px hsl(0deg 0% 50% / 0.333),
      2px 4px 4px hsl(0deg 0% 50% / 0.333),
      3px 6px 6px hsl(0deg 0% 50% / 0.333)`,
      3: `1px 2px 2px hsl(0deg 0% 50% / 0.2),
      2px 4px 4px hsl(0deg 0% 50% / 0.2),
      4px 8px 8px hsl(0deg 0% 50% / 0.2),
      8px 16px 16px hsl(0deg 0% 50% / 0.2),
      16px 32px 32px hsl(0deg 0% 50% / 0.2)`,
      4: `0px 0px 8px hsl(0deg 0% 50% / 0.1),
      1px 2px 2px hsl(0deg 0% 50% / 0.1),
      2px 4px 4px hsl(0deg 0% 50% / 0.2),
      4px 8px 8px hsl(0deg 0% 50% / 0.1),
      8px 16px 16px hsl(0deg 0% 50% / 0.05),
      16px 32px 32px hsl(0deg 0% 50% / 0.025)`,
    },
  },
})

export const lightTheme = createTheme({
  colors: {
    text: '#000',
    textSecondary: '#fff',
    primary: '#3500d3',
    secondary: '#1a0061',
    shade: '#5a2fbd',
    background: '#000',
  },
})

export const darkTheme = createTheme({
  colors: {
    text: '#fff',
    textSecondary: '#000',
    primary: '#230090',
    secondary: '#5a2fbd',
    shade: '#1a0061',
    background: '#fff',
  },
})

const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  '*': { margin: 0, padding: 0 },
  'html, body, #root': {
    height: '100%',
  },
  body: {
    lineHeight: 1.5,
    fontSmooth: 'antialiased',
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  'input, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },
  '#root': {
    isolation: 'isolate',
  },
})

type Values<T> = T[keyof T]

const Theme = {
  light: lightTheme,
  dark: darkTheme,
} as const

type Theme = Values<typeof Theme>

export const ThemeContext = createContext<{
  theme: Theme
  setTheme?: React.Dispatch<React.SetStateAction<Theme>>
}>({ theme: lightTheme })

export const ThemeProvider = ({ children }: React.ComponentProps<'div'>) => {
  const isDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useState<Theme>(isDark ? darkTheme : lightTheme)

  useEffect(() => {
    globalStyles()
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
