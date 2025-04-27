"use server";
import { ITodo } from "@/components/TodoTable";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const prisma = new PrismaClient();

export const GetTODO = async ({ userId }: { userId: string | null }) => {
  if (!userId) {
    redirect('/sign-in');
  }
  return await prisma.todo.findMany({
    where: {
      user_id: userId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const CreateTODO = async ({
  userId,
  title,
  body,
  completed,
}: {
  title: string;
  body: string | undefined;
  completed: boolean;
  userId: string | null;
}) => {
  const create = await prisma.todo.create({
    data: {
      user_id: userId as string,
      title,
      body,
      completed,
    },
  });
  revalidatePath("/");
  return create;
};
export const DeleteTODO = async ({ id }: { id: string }) => {
  const deleted = await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  return deleted;
};

export const UpdateTODO = async ({ id, title, body, completed }: ITodo) => {
  const update = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      completed,
    },
  });
  revalidatePath("/");
  return update;
};
