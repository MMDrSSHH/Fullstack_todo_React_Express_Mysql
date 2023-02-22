import { useEffect, useState } from "react";
import { useTodoDelete, useTodoUpdate } from "../../hooks/queryHooks";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import EditTodoModal from "../form/EditTodoModal";

function Todo({ data }: { data: any }) {
  const { mutate: todoUpdate } = useTodoUpdate();
  const { mutate: todoDelete } = useTodoDelete();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log("Todo " + data.id + " " + data.todo);
  });
  return (
    <div className="flex items-center justify-between rounded-md shadow-md shadow-slate-600 py-4 px-3">
      <div className="flex gap-x-3">
        <input
          checked={data.completed}
          onChange={() => {
            todoUpdate({
              todoId: data.id,
              todo: { completed: !data.completed },
            });
          }}
          type="checkbox"
        />
        <p>{data.todo}</p>
      </div>
      <div className="flex gap-x-4">
        <button onClick={() => setOpen(true)}>
          <MdModeEdit />
        </button>
        <button onClick={() => todoDelete({ todoId: data.id })}>
          <FaTrash />
        </button>
        <EditTodoModal
          children={<></>}
          open={open}
          todoId={data.id}
          todoText={data.todo}
          onClose={() => setOpen(false)}
          handleClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}

export default Todo;
