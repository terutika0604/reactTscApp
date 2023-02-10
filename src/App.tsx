import React, { useState } from 'react';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  // todoのテキストの状態
  const [inputValue, setInputValue] = useState("");
  // todoを格納する配列
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // todoの型宣言
  type Todo = {
    inputValue: string;
    id:number;
    checked:boolean;
  }

  // todo追加
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 新しいTODOを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    }

    setTodos([newTodo, ...todos]);
    setInputValue("");
  }

  // todo編集
  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  }
  
  // inputの値をstateにset
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  } 

  // チェックボックス操作
  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  }

  // 削除処理
  const handleDelete = (id: number) => {
    // idが整合するもののみtrue
    const newTodos = todos.filter((todo) => todo.id !== id )
    setTodos(newTodos);
  }
  
  return (
    <div className="App">
        <div>
          <h2>Todo List<AccessAlarmIcon /></h2>
          <form onSubmit={(e) => {handleSubmit(e)}}>
            <input type="text" onChange={(e) => handleChange(e)} className="inputText" />
            <input type="submit" value="作成" className="submitButton" />
          </form>
          <ul className="todoList">
            {todos.map((todo) => (
              <li key={todo.id}>
                <input  
                  type="text" 
                  onChange={(e) => handleEdit(todo.id, e.target.value)} 
                  className="inputText" 
                  value={todo.inputValue}
                  disabled={todo.checked}
                />
                <input type="checkbox" onChange={() => handleChecked(todo.id, todo.checked)} />
                <button onClick={() => handleDelete(todo.id)}>消す</button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* <Button variant="contained">追加</Button> */}
    </div>
  );
}

export default App;
