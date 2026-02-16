import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Editor } from './Editor.tsx'

describe('Editor', () => {
    it('renders a contentEditable div', () => {
        render(<Editor />)
        const editor = screen.getByRole('textbox')
        expect(editor).toBeInTheDocument()
        expect(editor).toHaveAttribute('contenteditable', 'true')
    })

    it('calls onInput when typing', async () => {
        render(<Editor />)
        const editor = screen.getByRole('textbox')

        await userEvent.type(editor, 'hello')
        expect(editor).toHaveTextContent('hello')
    })

    it('strips HTML formatting on paste', () => {
        render(<Editor />)
        const editor = screen.getByRole('textbox')

        const pasteEvent = fireEvent.paste(editor, {
            clipboardData: {
                getData: (type: string) =>
                    type === 'text/plain' ? 'plain text' : '<b>bold html</b>',
            },
        })

        // fireEvent.paste returns false when preventDefault() was called
        expect(pasteEvent).toBe(false)
    })
})
