import React, { useState } from 'react';
import './App.css';

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

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
    console.log(inputValue);
    const newTodos = todos.map((todo) => {
      if(todo.id === id){
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  }
  
  // inputの値をstateにset
  const handleChange = (text: React.SetStateAction<string>) => {
    setInputValue(text);
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
          <h2>Todo List<FormatListBulletedIcon sx={{ fontSize: 30, verticalAlign: "bottom", ml: 1}} /></h2>
          <form onSubmit={(e) => {handleSubmit(e)}}>
            <TextField 
              label="TodoList"
              variant="outlined"
              onChange={(e) => handleChange(e.target.value)} 
            />
            <Button 
              type="submit"
              variant="contained"
              endIcon={<AddIcon />}
              sx={{
                mt: 1,
                ml: 2,
              }}
            >ADD</Button>
          </form>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <Grid container spacing={1} sx={{ textAlign: "center" }}>
                  <Grid item xs={6}>
                    <TextField 
                      label="todo"
                      variant="outlined"
                      size="small"
                      onChange={(e) => handleEdit(todo.id, e.target.value)} 
                      value={todo.inputValue}
                      disabled={todo.checked}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Checkbox size="small" color="success" onChange={() => handleChecked(todo.id, todo.checked)} sx={{ mt: 2 }} />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(todo.id)} sx={{ mt: 2 }}>
                      delete<DeleteForeverOutlinedIcon />
                    </Button>
                  </Grid>
                </Grid>
              </li>
            ))}
          </ul>
        </div>
        
        {/* <Button variant="contained">追加</Button> */}
    </div>
  );
}

export default App;
