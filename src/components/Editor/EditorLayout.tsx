import { Toolbar, type ActiveFormats } from './Toolbar'
import { Editor } from './Editor'
import { useEffect, useState } from 'react'
export function EditorLayout() {
    type ActionTags = 'strong' | 'i' | 'u' | 's'

    function handleAction(tag: ActionTags) {
        const selection = window.getSelection()
        if (!selection?.rangeCount) return

        const range = selection.getRangeAt(0)
        if (range.collapsed) return

        try {
            const action = document.createElement(tag)
            range.surroundContents(action)
        } catch (err) {
            const fragment = range.extractContents()
            const action = document.createElement(tag)
            action.appendChild(fragment)
            range.insertNode(action)

            selection.removeAllRanges()
            const newRange = document.createRange()
            newRange.setStartAfter(action)
            newRange.collapse(true)
            selection.addRange(newRange)
        }
    }

    const [activeFormats, setActiveFormats] = useState<Set<ActiveFormats>>(new Set())

    useEffect(() => {
        const handleSelectionChange = () => {
            const sel = window.getSelection()
            if (!sel?.rangeCount) return

            const editorEl = document.getElementById('editor')
            if (!editorEl?.contains(sel.anchorNode)) {
                setActiveFormats(new Set())
                return
            }

            const formats = new Set<ActiveFormats>()
            let current: Node | null = sel.anchorNode
            while (current && current !== editorEl) {
                if (current instanceof HTMLElement) {
                    const tag = current.tagName.toLowerCase()
                    if (tag === 'strong' || tag === 'b') formats.add('bold')
                    if (tag === 'i' || tag === 'em') formats.add('italic')
                    if (tag === 'u') formats.add('underline')
                    if (tag === 's' || tag === 'del') formats.add('strikethrough')
                }
                current = current.parentNode
            }
            setActiveFormats(formats)
        }

        document.addEventListener('selectionchange', handleSelectionChange)
        return () => document.removeEventListener('selectionchange', handleSelectionChange)
    }, [])

    const list: { name: ActiveFormats; fn: () => void }[] = [
        {
            name: 'bold',
            fn: () => handleAction('strong'),
        },
        {
            name: 'italic',
            fn: () => handleAction('i'),
        },
        {
            name: 'underline',
            fn: () => handleAction('u'),
        },
        {
            name: 'strikethrough',
            fn: () => handleAction('s'),
        },
    ]

    return (
        <div className={'flex flex-col gap-4 justify-center'}>
            <Toolbar list={list} activeFormats={activeFormats} />
            <Editor />
            {/*<div className={'border border-white w-1/2 h-full min-h-screen outline-none'}>*/}
            {/*    {content}*/}
            {/*</div>*/}
        </div>
    )
}
