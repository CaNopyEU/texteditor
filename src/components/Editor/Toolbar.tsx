import { Button } from '../General/Button.tsx'

export type ActiveFormats = 'bold' | 'italic' | 'underline' | 'strikethrough'

interface ToolbarListItem {
    name: ActiveFormats
    fn: () => void
}

interface ToolbarProps {
    list: ToolbarListItem[]
    activeFormats: Set<ActiveFormats>
}

export function Toolbar({ list, activeFormats }: ToolbarProps) {
    return (
        <div className={'flex gap-4 justify-center'}>
            {list.map((item) => {
                return (
                    <Button
                        key={item.name}
                        name={item.name}
                        handleClick={item.fn}
                        active={activeFormats.has(item.name)}
                    />
                )
            })}
        </div>
    )
}
