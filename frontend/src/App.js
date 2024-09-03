import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/todos')
      .then(response => {
        setTodos(response.data);
      });
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:8000/api/todos', { title: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      });
  };

  const toggleComplete = (id, completed) => {
    axios.put(`http://localhost:8000/api/todos/${id}`, { completed })
      .then(response => {
        setTodos(todos.map(todo => todo.id === id ? response.data : todo));
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id, !todo.completed)}
            />
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

