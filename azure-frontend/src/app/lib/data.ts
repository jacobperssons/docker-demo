/* eslint-disable @typescript-eslint/no-explicit-any */
import { definitions } from "./definitions";

async function fetchData(url: string, options: any = {}) {
    try {
        console.log(`${definitions.BASE}/${url}`);
        const response = await fetch(`${definitions.BASE}/${url}`, {
            ...options,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data from /${url}`);
        }

        if (options.method !== "DELETE") {
            const data = await response.json();
            console.log(data);
            return data || "";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export function fetchTodos() {
    return fetchData(definitions.LIST_TODOS, {
        method: "GET",
    });
}