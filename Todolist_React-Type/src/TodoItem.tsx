import React from "react";
import "./index.css";
import { TodoObj } from "./App";

interface TodoProp {
  todo: TodoObj;
  toggleTodo: (id: string) => void;
}

export const TodoItem: React.FC<TodoProp> = ({ todo, toggleTodo }) => {
  const handleToggleTodo: React.ChangeEventHandler<HTMLInputElement> = () => {
    toggleTodo(todo.id);
  };
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleTodo}
          readOnly
        />
      </label>
      {todo.name}
    </div>
  );
};
