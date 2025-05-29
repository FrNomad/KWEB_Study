import { useCallback, useRef, useState } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
}

function App() {
  const [content, setContent] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const id = useRef<number>(0);

  const newId = useCallback(() => {
    id.current += 1;
    return id.current;
  }, []);

  const submit = useCallback(() => {
    if(content !== '') {
      setTodos(todos => [...todos, { id: newId(), text: content }]);
      setContent('');
    }
  }, [content]);

  return (
    <main style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
      <h1>
        todo List 실습
      </h1>
      <div className="card">
        <input className='' type="text" placeholder="Type something..." value={content} onChange={e => {
          setContent(e.target.value);
        }} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submit();
          }
        }} />
        <button onClick={() => {
          submit();
        }}>
          add
        </button>
      </div>
      {todos.map(todo => (
        <div key={todo.id}>
          <button onClick={() => {
            setTodos(todos => todos.filter(t => t.id !== todo.id));
          }}>
            ☑️
          </button>
          <span>{todo.text}</span>
        </div>
      ))}
    </main>
  )
}

export default App