import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "./ui/badge";

import TodosButtons from "./TodosButtons";
import { memo } from "react";

export interface ITodo {
  id: string;
  title: string;
  body: string | null;
  completed: boolean;
  createdAt?: Date;
}
 function TodoTable({ todos }: { todos: ITodo[] }) {
  return (
    <div className=" translate-x-5 max-w-full ">
      {" "}
      <Table className="container ">
        <TableCaption>A list of your recent todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Created At</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo?.id}>
              <TableCell>{todo?.createdAt?.toLocaleString()}</TableCell>
              <TableCell>{todo?.title}</TableCell>
              <TableCell>
                {todo?.completed ? (
                  <Badge>Completed</Badge>
                ) : (
                  <Badge variant={"secondary"}>Uncompleted</Badge>
                )}
              </TableCell>
              <TableCell className="flex items-center justify-end space-x-2">
                <TodosButtons todo={todo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default memo(TodoTable);