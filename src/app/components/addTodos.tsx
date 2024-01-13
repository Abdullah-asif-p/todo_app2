"use client";
import { useState, useEffect } from "react";
import TodoList from "./todoList";
type Todo = string;

export default function AddTodos() {
  const [showInput, setShowInput] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // Function to fetch all todos and set them in state
  const getAllTodos = (): Todo[] => {
    const tempItems: string | null = localStorage.getItem("todos");
    return tempItems ? JSON.parse(tempItems) : [];
  };

  const setAllTodos = (items: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(items));
  };

  // Function to fetch all todos and set them in state
  const getAll = () => {
    const tempItems = getAllTodos();
    setTodos(tempItems);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      const newTodo: Todo = todoText.trim();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodoText("");
      setShowInput(false);
      setAllTodos([...todos, newTodo]); // Update localStorage
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  // Delete todos
  const deleteTodo = (index: number) => {
    const tempItems = getAllTodos();
    tempItems.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(tempItems));
    getAll();
  };
  //Edit todos
  const editTodos = (index: number, editedTodos: string) => {
    setShowInput(false);
    const tempItems = getAllTodos();
    tempItems[index] = editedTodos;
    setAllTodos(tempItems);
    getAll();
  };

  // Load todos from local storage on initial render
  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="w-full">
      <button
        className="relative left-3/4 top-0 bg-yellow-hf text-white text-3xl text-center w-10 h-10 rounded-full"
        onClick={() => {
          setShowInput(!showInput);
        }}
      >
        +
      </button>
      {showInput && (
        <div className=" flex flex-row items-center justify-center">
          <input
            type="text"
            placeholder="Input todo"
            className=" mt-2 text-center text-lg p-1 rounded-lg w-3/4 bg-[#F8F8FF] outline-slate-200"
            value={todoText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {/* <input type="time" value={todoTime} /> */}
        </div>
      )}
      {/* Displaying Todos */}
      <ul className=" flex flex-col  items-center w-full mt-8">
        {todos.map((todo, index) => (
          <TodoList
            key={index}
            todo={todo}
            index={index}
            onDelete={deleteTodo}
            editTodos={editTodos}
          />
        ))}
      </ul>
    </div>
  );
}
