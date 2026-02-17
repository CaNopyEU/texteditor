import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
    it('renders with the given name', () => {
        render(<Button name="bold" handleClick={vi.fn()} active={false} />)
        expect(screen.getByRole('button', { name: 'bold' })).toBeInTheDocument()
    })

    it('calls handleClick on click', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()
        render(<Button name="bold" handleClick={handleClick} active={false} />)

        await user.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalledOnce()
    })

    it('shows active visual state when active is true', () => {
        render(<Button name="bold" handleClick={vi.fn()} active={true} />)
        const btn = screen.getByRole('button')
        expect(btn.className).toContain('bg-blue-900')
        expect(btn.className).not.toContain('bg-blue-950')
    })

    it('shows inactive visual state when active is false', () => {
        render(<Button name="bold" handleClick={vi.fn()} active={false} />)
        const btn = screen.getByRole('button')
        const classes = btn.className.split(' ')
        expect(classes).toContain('bg-blue-950')
        expect(classes).not.toContain('bg-blue-900')
    })
})
