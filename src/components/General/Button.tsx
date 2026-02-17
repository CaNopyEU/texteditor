export function Button({
    name,
    handleClick,
    active,
}: {
    name: string
    handleClick: () => void
    active: boolean
}) {
    return (
        <button
            className={`border border-white rounded-2xl p-2 ${
                active ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-950 hover:bg-blue-900'
            }`}
            onClick={handleClick}
        >
            {name}
        </button>
    )
}
