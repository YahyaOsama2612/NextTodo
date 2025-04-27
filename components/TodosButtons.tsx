"use client"
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { DeleteTODO } from "@/actions/todoActions";
import Sppiner from "./Sppiner";
import { useState, useCallback } from "react";
import EditTodoForm from "./EditTodoForm";
import { ITodo } from "./TodoTable";

function TodosButtons({ todo }: { todo: ITodo }) {
  const [isloading, setloading] = useState(false);

  const handleDelete = useCallback(async () => {
    setloading(true);
    await DeleteTODO({ id: todo.id });
    setloading(false);
  }, [todo.id]);

  return (
    <div className="flex items-center space-x-2">
      <EditTodoForm todo={todo} />
      <Button
        size={"icon"}
        variant={"destructive"}
        onClick={handleDelete}
      >
        {isloading ? <Sppiner /> : <Trash size={16} />}
      </Button>
    </div>
  );
}

export default TodosButtons;