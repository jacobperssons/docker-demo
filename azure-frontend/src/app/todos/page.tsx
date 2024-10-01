"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Todo } from "@/app/lib/todo";
import { fetchTodos } from "@/app/lib/data";

export default function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        async function getTodos() {
            try {
                const data = await fetchTodos();
                setTodos(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getTodos();
    }, []);

    return (
        <div className="">
            <div className="flex justify-between px-4">
                <h1 className="text-[2.25em]/none font-semibold text-[#171717]">
                    Your Todos
                </h1>
                <button className="px-2 rounded-md bg-sky-500/100 hover:bg-sky-700/100 text-white shadow-md shadow-black">
                    <Link href={"todos/add-todo"}>Add new Todo</Link>
                </button>
            </div>

            <div className="flex justify-center shadow-sm">
                <table className="w-2/3 table-fixed border-collapse text-sm">
                    <thead>
                        <tr>
                            {[
                                "Description",
                                "Target Date",
                                "Done",
                                "Actions"
                            ].map((key) => (
                                <th
                                    className={`border-b dark:border-slate-600 font-medium p-4 ${
                                        key === "Description"
                                            ? "pl-8"
                                            : key === "Actions"
                                            ? "pr-8"
                                            : ""
                                    } pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left`}
                                    key={key}
                                >
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white dark:bg-slate-800">
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                {Object.entries(todo).map(([key, value]) => {
                                    if (key !== "id" && key !== "user") {
                                        let temp;

                                        if (key === "isDone") {
                                            temp = value ? "Yes" : "No";
                                        } else if (key === "targetDate") {
                                            temp = value.toString().substring(0, 10);
                                        } else {
                                            temp = value;
                                        }

                                        return (
                                            <td className={`${key === "description" ? "pl-8" : ""} border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400`} key={key}>{temp}</td>
                                        );
                                    }
                                })}
                                
                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                    <button className="mr-4 px-2 bg-orange-400 text-white rounded-md shadow-md shadow-black">
                                        Update
                                    </button>

                                    <button className="px-2 bg-red-600 text-white rounded-md shadow-md shadow-black">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ul className="flex my-4"></ul>
        </div>
    );
}
