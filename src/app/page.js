import CreateTask from "@/components/CreateTask";
import RedirectToLogin from "@/components/RedirectToLogin";
import TaskList from "@/components/TaskList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-stretch justify-center p-4 container">
      <RedirectToLogin></RedirectToLogin>
      <CreateTask></CreateTask>
      <TaskList></TaskList>
    </main>
  );
}
