import './App.css'
import { EditorLayout } from './components/Editor/EditorLayout.tsx'

function App() {
    return (
        <main className="w-full h-full">
            <h1 className={'text-center text-2xl font-semibold text-gray-900'}>Hello editor</h1>
            <EditorLayout />
        </main>
    )
}

export default App
