
import './App.css'
import TodoList from './Todo-list/TodoList'

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">Welcome to my project</h1>
      </header>
      <TodoList/>
      <footer className="text-center mt-5 text-gray-700">
        <p>Built with React and Tailwind CSS by Hamed Mahjoobi</p>
      </footer>
    </div>
      
    </>
  )
}

export default App
