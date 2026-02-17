import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toolbar, type ActiveFormats } from './Toolbar'

const defaultList: { name: ActiveFormats; fn: () => void }[] = [
    { name: 'bold', fn: vi.fn() },
    { name: 'italic', fn: vi.fn() },
    { name: 'underline', fn: vi.fn() },
    { name: 'strikethrough', fn: vi.fn() },
]

describe('Toolbar', () => {
    it('renders all formatting buttons', () => {
        render(<Toolbar list={defaultList} activeFormats={new Set()} />)

        expect(screen.getByText('bold')).toBeInTheDocument()
        expect(screen.getByText('italic')).toBeInTheDocument()
        expect(screen.getByText('underline')).toBeInTheDocument()
        expect(screen.getByText('strikethrough')).toBeInTheDocument()
    })

    it('calls the correct format handler on click', async () => {
        const user = userEvent.setup()
        render(<Toolbar list={defaultList} activeFormats={new Set()} />)

        await user.click(screen.getByText('bold'))
        expect(defaultList[0].fn).toHaveBeenCalledOnce()

        await user.click(screen.getByText('italic'))
        expect(defaultList[1].fn).toHaveBeenCalledOnce()
    })

    it('shows active state when format is active', () => {
        const activeFormats = new Set<ActiveFormats>(['bold', 'underline'])
        render(<Toolbar list={defaultList} activeFormats={activeFormats} />)

        const boldBtn = screen.getByText('bold')
        const italicBtn = screen.getByText('italic')
        const underlineBtn = screen.getByText('underline')

        expect(boldBtn.className).toContain('bg-blue-900')
        expect(underlineBtn.className).toContain('bg-blue-900')
        expect(italicBtn.className).toContain('bg-blue-950')
    })
})
