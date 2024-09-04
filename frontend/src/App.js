import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/todos')
      .then(response => {
        setTodos(response.data);  // データをセット
      })
      .catch(error => {
        console.error("Error fetching todos:", error);
      });
  }, [todos]);  // `todos`が更新されるたびに再フェッチ

  const addTodo = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/todos', { 名前: newTodo });
      setTodos([...todos, response.data]);  // 新しいデータを追加
      setNewTodo('');  // 入力フィールドをクリア
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.番号 !== id));  // 削除されたデータを除外
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
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
          <li key={todo.番号}>
            {todo.名前}
            <button onClick={() => deleteTodo(todo.番号)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
