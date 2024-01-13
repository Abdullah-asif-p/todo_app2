This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```Tsx
"use client";
import { useState, useEffect } from "react";

type Todo = string;

export default function AddTodos() {
  // State for managing whether to show the input field
  const [showInput, setShowInput] = useState(false);

  // State for managing the text input for the new todo
  const [todoText, setTodoText] = useState("");

  // State for managing the list of todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // Function to fetch all todos from localStorage
  const getAllTodos = (): Todo[] => {
    const tempItems: string | null = localStorage.getItem("todos");
    return tempItems ? JSON.parse(tempItems) : [];
  };

  // Function to save all todos to localStorage
  const setAllTodos = (items: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(items));
  };

  // Function to fetch all todos and set them in state
  const getAll = () => {
    const tempItems = getAllTodos();
    setTodos(tempItems);
  };

  // Handler for input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  // Handler for adding a new todo
  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      // Create a new todo from the input text
      const newTodo: Todo = todoText.trim();

      // Update state to include the new todo
      setTodos((prevTodos) => [...prevTodos, newTodo]);

      // Clear the input field and hide it
      setTodoText("");
      setShowInput(false);

      // Update localStorage with the updated todos
      setAllTodos([...todos, newTodo]);
    }
  };

  // Handler for Enter key press
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  // Load todos from local storage on initial render
  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      {/* Button to toggle showing the input field */}
      <div className="relative left-1/4 top-0">
        <button
          className="relative left-1/4 top-0 bg-yellow-hf text-white text-3xl text-center w-10 h-10 rounded-full"
          onClick={() => setShowInput(!showInput)}
        >
          +
        </button>
      </div>

      {/* Input field for adding new todos */}
      {showInput && (
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Input todo"
            className="text-center text-lg w-full border-none outline-none"
            value={todoText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}

      {/* Displaying Todos */}
      <ul className="flex flex-col items-center w-full mt-8">
        {todos.map((todo, index) => (
          <li
            className="text-center border-none rounded-lg outline-none bg-[#f6f7fb] p-2 w-4/5 mt-2"
            key={index}
          >
            {todo}
          </li>
        ))}
      </ul>
    </>
  );
}
```

State Hooks:

showInput: Manages whether the input field for adding todos is visible or not.
todoText: Holds the text input for the new todo.
todos: Represents the list of todos.
getAllTodos Function:

Retrieves the todos from localStorage. If there are no todos, it returns an empty array.
setAllTodos Function:

Saves the provided list of todos to localStorage.
getAll Function:

Fetches all todos from localStorage and sets them in the state.
Event Handlers:

handleInputChange: Updates the todoText state as the user types in the input field.
handleAddTodo: Adds a new todo to the state and updates localStorage when the user clicks the "Enter" key or adds a todo using the input field.
handleKeyDown: Listens for the "Enter" key press to trigger the handleAddTodo function.
useEffect for Initial Load:

Calls getAll on the initial render to load todos from localStorage.
Rendering:

Button to toggle the visibility of the input field.
Input field for adding new todos
