import { useRef, useState, type InputEvent, type ClipboardEvent, type KeyboardEvent } from 'react'

export function Editor() {
    const editorRef = useRef<HTMLDivElement>(null)
    const [content, setContent] = useState('')

    const onInput = (e: InputEvent<HTMLDivElement>): void => {
        setContent(e.currentTarget.innerHTML)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
        console.log(e)
    }

    const handleClipboardEvent = (e: ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault()

        const text = e.clipboardData.getData('text/plain')
        const selection = window.getSelection()
        if (!selection?.rangeCount) return

        const range = selection.getRangeAt(0)

        setContent((content) => {
            return (
                content.slice(0, range.startOffset) +
                text +
                content.slice(range.endOffset, content.length)
            )
        })
    }

    return (
        <div className={'flex gap-4'}>
            <div
                id={'editor'}
                ref={editorRef}
                className={'border border-white w-1/2 h-full min-h-screen outline-none'}
                contentEditable={true}
                role={'textbox'}
                onInput={onInput}
                onKeyDown={onKeyDown}
                onPaste={handleClipboardEvent}
            />
            <div className={'border border-white w-1/2 h-full min-h-screen outline-none'}>
                {content}
            </div>
        </div>
    )
}
