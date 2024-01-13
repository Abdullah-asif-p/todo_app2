import { useState } from "react";

type TodoItemProps = {
  todo: string;
  index: number;
  onDelete: (index: number) => void;
  editTodos: (index: number, editedTodos: string) => void;
};

export default function TodoList({
  todo,
  index,
  onDelete,
  editTodos,
}: TodoItemProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [editedText, setEditedText] = useState(todo);
  const [editMode, setEditMode] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleEditedText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      editTodos(index, editedText);
      setEditMode(!editMode);
    }
  };
  const textStyle = isChecked ? "line-through" : "none";
  const boxStyle = isChecked ? "bg-yellow-hf" : "bg-[#FAEBD7]";
  const check = isChecked ? "✔" : "⏰";
  return (
    <div className=" flex flex-row  w-full items-center justify-center">
      {editMode && (
        <button className="mr-2 text-2xl" onClick={handleCheckboxChange}>
          {check}
        </button>
      )}
      <li
        className={`relative top-0 text-center line-clamp-3 p-1  border-none rounded-lg outline-none mb-3 w-4/5 ${boxStyle}`}
        key={index}
      >
        {!editMode && (
          <input
            type="text"
            value={editedText}
            onChange={handleEditedText}
            className=" text-xl text-center rounded-lg outline-none  w-[90%] h-3/4 p-1 m-2 my-3"
            onKeyDown={handleKeyDown}
          />
        )}
        {editMode && (
          <>
            <span className={`text-xl ${textStyle}`}>{todo}</span>
            <div className="flex flex-row text-sm text-white ">
              <button
                onClick={() => onDelete(index)}
                className="p-1  relative left-[90%] rounded-lg hover:bg-zinc-500  bg-zinc-400 "
              >
                Delete
              </button>
              <button
                className=" ml-2 relative left-[90%] p-1 rounded-lg hover:bg-zinc-500  bg-zinc-400 "
                onClick={() => {
                  editTodos(index, editedText);
                  setEditMode(!editMode);
                  setEditedText(todo);
                }}
              >
                Edit
              </button>
            </div>
          </>
        )}
      </li>
    </div>
  );
}
