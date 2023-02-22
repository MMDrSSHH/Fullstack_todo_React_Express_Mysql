import { useTodos } from "../../hooks/queryHooks";
import Todo from "./Todo";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddTodoModal from "../form/AddTodoModal";

function Todos() {
  const { data: todos } = useTodos();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-50 py-3 px-5 rounded-md w-11/12 lg:w-1/2">
        <h2 className="text-center text-4xl mb-10 pb-2 border-b-2 border-slate-800">Todos</h2>
        {todos?.data.length ? (
          <div className="flex flex-col gap-y-7 my-5">
            {todos?.data.map((todo: any) => (
              <Todo key={todo.id} data={todo} />
            ))}
          </div>
        ) : (
          <div>
            <h4 className="text-2xl text-center">
              You haven't set any todos yet
            </h4>
          </div>
        )}
      </div>
      <button
        className="w-[70px] h-[70px] bg-orange-400 rounded-full text-6xl flex items-center 
        justify-center text-slate-900 fixed bottom-10 left-10"
        onClick={() => setOpen(true)}
      >
        <AiOutlinePlus />
      </button>
      <AddTodoModal
        open={open}
        children={<></>}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}

export default Todos;
