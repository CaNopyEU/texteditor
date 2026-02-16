import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.tsx'

describe('App smoke test', () => {
    it('renders without crashing', () => {
        render(<App />)
        expect(screen.getByText('Hello editor')).toBeInTheDocument()
    })
})
