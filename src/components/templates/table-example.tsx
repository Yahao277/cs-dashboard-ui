import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"
import {taskSchema} from "@/lib/data/schema";
import {DataTable} from "@/components/organisms/task-table/data-table";
import {columns} from "@/components/molecules/data-table/columns";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/lib/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function TableExample() {
  const tasks = await getTasks()

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex bg-background border rounded-lg">
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
