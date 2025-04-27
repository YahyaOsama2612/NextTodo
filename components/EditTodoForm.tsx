"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { TodoFormSchema, TodoFormValues } from "@/validation";
import { Checkbox } from "@/components/ui/checkbox";
import  Sppiner  from "./Sppiner";
import {  useCallback, useState } from "react";
import { ITodo } from "./TodoTable";
import { UpdateTODO } from "@/actions/todoActions";
import { Pen } from "lucide-react";

 function EditTodoForm({ todo }: { todo: ITodo }) {
  const defaultValues: Partial<TodoFormValues> = {
    title: todo.title,
    body: todo.body as string,
    completed: todo.completed,
  };
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(TodoFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const [isloading, setloading] = useState(false);
  const [open, setopen] = useState(false);

  const onSubmit = useCallback(async (data: TodoFormValues) => {
    setloading(true);
    await UpdateTODO({
      id: todo.id,
      title: data.title,
      body: data.body as string,
      completed: data.completed,
    });
    setloading(false);
    setopen(false);
  }, [todo.id]);

  return (
    <div className="container">
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger asChild  >
          <Button size={"icon"}  >
            <Pen size={16}  />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your TODO here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className=" py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="My todo" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name. It can be your real
                        name or a pseudonym.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descreption</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a little bit about your todo"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can write a little bit about the todo
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="completed"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>completed</FormLabel>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isloading}>
                  {isloading ? (
                    <>
                      <Sppiner /> Saving{" "}
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default EditTodoForm;