import DateTime from "./components/date";
import AddTodos from "./components/addTodos";
export default function Home() {
  return (
    <main className="flex flex-col overflow-auto items-center justify-between p-6">
      <h1 className="text-center text-3xl font-bold mt-10">Today’s schedule</h1>
      <DateTime />
      <AddTodos />
    </main>
  );
}
