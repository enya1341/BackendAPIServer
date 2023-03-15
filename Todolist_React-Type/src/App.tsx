import "./index.css";
import { TodoList } from "./TodoList";
import { APIBody } from "./APIBody";
import axios, { AxiosResponse } from "axios";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface TodoObj {
  id: string;
  name: string;
  completed: boolean;
}

export interface TodoObjAPI {
  data: TodoObj[];
}

export interface PublicAPIs {
  count: number;
  entries: PublicAPIEntry[];
}

export interface PublicAPIEntry {
  API: string;
  Category: string;
  Description: string;
  Link: string;
}

export const App: React.FC = () => {
  const [useTodos, setUseTodos] = useState<TodoObj[]>([
    {
      id: "",
      name: "",
      completed: true,
    },
  ]);
  useEffect(() => {
    const getUser: () => Promise<void> = async () => {
      await axios
        .get("/api/get")
        .then((response: AxiosResponse<TodoObjAPI>) => {
          const { data, status } = response;
          if (status !== 200) {
            return;
          }
          setUseTodos(data.data);
        })
        .catch(() => "test");
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUser();
  }, []);
  const useTodoNameRef = useRef<HTMLInputElement>(null);
  const handleAddTodo: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (
      useTodoNameRef.current !== null &&
      useTodoNameRef.current.value !== ""
    ) {
      const todoName: string = useTodoNameRef.current.value;
      const todoId: string = uuidv4();
      useTodoNameRef.current.value = "";
      setUseTodos((prevTodos: TodoObj[]) => {
        return [...prevTodos, { id: todoId, name: todoName, completed: false }];
      });
      const requestData: TodoObj = {
        id: todoId,
        name: todoName,
        completed: false
      };
      axios
        .put("/api/put", requestData)
        .then((response: AxiosResponse<TodoObjAPI>) => {
          const { data, status } = response;
          if (status !== 200) {
            console.log("data", data);
            return;
          }
          console.log("data", data);
        })
        .catch(() => "test");
    }
    };

    const toggleTodo: (id: string) => void = (id: string) => {
      const newTodos = [...useTodos];
      const todo = newTodos.find((todo) => todo.id === id);
      if (todo !== undefined) {
        todo.completed = !todo.completed;
      }
      setUseTodos(newTodos);
    };

    const handleClear: React.MouseEventHandler<HTMLButtonElement> = () => {
      const newTodos = useTodos.filter((todo) => !todo.completed);
      setUseTodos(newTodos);
    };
    const [usePublicAPIData, setUsePublicAPIData] = useState<PublicAPIs>({
      count: 0,
      entries: [],
    });
    const baseURL = "https://api.publicapis.org/entries";
    const [useSwitchPageBody, setUseSwitchPageBody] =
      React.useState<boolean>(false);
    useEffect(() => {
      const getUser: () => Promise<void> = async () => {
        await axios
          .get(baseURL)
          .then((response: AxiosResponse<PublicAPIs>) => {
            const { data, status } = response;
            if (status !== 200) {
              return;
            }
            setUsePublicAPIData(data);
          })
          .catch(() => "test");
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getUser();
    }, []);

    const handleShowAPI: React.MouseEventHandler<HTMLButtonElement> = () => {
      setUseSwitchPageBody(!useSwitchPageBody);
    };
    if (!useSwitchPageBody) {
      return (
        <div>
          <TodoList todos={useTodos} toggleTodo={toggleTodo} />
          <input type="text" ref={useTodoNameRef} />
          <button onClick={handleAddTodo}>タスクを追加</button>
          <button onClick={handleClear}>選択したタスクを削除</button>
          <div>
            残りのタスク:{useTodos.filter((todo) => !todo.completed).length}
          </div>
          <div>APITable</div>
          <button onClick={handleShowAPI}>APIを表示</button>
        </div>
      );
    } else {
      return (
        <div>
          <div>APITable</div>
          <button onClick={handleShowAPI}>タスクを表示</button>
          <table>
            <thead>
              <tr>
                <th>番号</th>
                <th>タイトル</th>
                <th>カテゴリー</th>
                <th>概要</th>
                <th>リンク</th>
              </tr>
            </thead>
            <APIBody data={usePublicAPIData}></APIBody>
          </table>
        </div>
      );
    }
  }
