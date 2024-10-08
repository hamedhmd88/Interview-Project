import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoText from "./TodoText";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (textContent, createDate, deadLine) => {
    if (textContent) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          textContent,
          createDate,
          deadLine,
        },
      ]);
    }
  };

  const editTask = (taskId, newContent, newDeadline) => {
    setTodos((prevState) =>
      prevState.map((task) =>
        task.id === taskId ? { ...task, textContent: newContent, deadLine: newDeadline } : task
      )
    );
  };

  return (
    <>
      <TodoInput todos={todos} setTodos={setTodos} addTodo={addTodo} />
      <TodoText todos={todos} setTodos={setTodos} editTask={editTask} />
    </>
  );
}

export default TodoList;
