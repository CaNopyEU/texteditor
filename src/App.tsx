import './App.css'
import { Editor } from './components/Editor/Editor.tsx'

function App() {
    return (
        <main className="w-full h-full">
            <h1 className={'text-center text-2xl font-semibold text-gray-900'}>Hello editor</h1>
            <Editor />
        </main>
    )
}

export default App
