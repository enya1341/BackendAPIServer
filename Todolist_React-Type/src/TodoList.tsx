import { TodoItem } from "./TodoItem";
import "./index.css";
import React from "react";
import { TodoObj } from "./App";

interface TodoListProp {
  todos: TodoObj[];
  toggleTodo: (id: string) => void;
}

export const TodoList: React.FC<TodoListProp> = ({ todos, toggleTodo }) => {
  const item = todos.map((todo: TodoObj) => {
    if (todo.name !== "") {
      return <TodoItem todo={todo} toggleTodo={toggleTodo} key={todo.id} />;
    } else {
      return null;
    }
  });
  return <div>{item}</div>;
};
