import { GetTODO } from "@/actions/todoActions";
import AddTodoForm from "@/components/AddTodoForm";
import TodoTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import Sppiner from "@/components/Sppiner";

export default async function Home() {
  const { userId } = await auth();

  const todos = await GetTODO({ userId });

  return (
    <div className="container">
      <AddTodoForm userId={userId} />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Sppiner />
          </div>
        }
      >
        <TodoTable todos={todos} />
      </Suspense>
    </div>
  );
}