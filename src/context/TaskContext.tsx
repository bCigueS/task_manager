import React, { createContext, useEffect, useState } from "react";
import { Task } from "../typescript/types";
import { useLocalStorage } from "../hook/useLocalStorage";

interface TaskContextParams {
	tasks: Task[];
	uniqueId: number;
	addTask: (task: Task) => void;
	deleteTask: (task: Task) => void;
	changeStatus: (taskToUpdate: Task) => void;
	pendingTasks: () => Task[];
	completedTasks: () => Task[];
}

export const TaskContext = createContext<TaskContextParams>({
	tasks: [],
	uniqueId: 1,
	addTask: (task: Task) => {
		task;
	},
	deleteTask: (task: Task) => {
		task;
	},
	changeStatus: (taskToUpdate: Task) => {
		taskToUpdate;
	},
	pendingTasks: () => [],
	completedTasks: () => [],
});

interface TaskContextProviderProps {
	children: React.ReactNode;
}

const TaskContextProvider: React.FC<TaskContextProviderProps> = ({
	children,
}) => {
	const [localStorageData, setLocalStorageData] = useLocalStorage("task", []);
	const [tasks, setTasks] = useState<Task[]>(localStorageData);
	const [uniqueId, setUniqueId] = useState<number>(
		tasks.length === 0 ? 0 : tasks[tasks.length - 1].id + 1
	);

	const addTask = (newTask: Task) => {
		setTasks((prevTasks) => [...prevTasks, newTask]);
		setLocalStorageData([...localStorageData, newTask]);
		setUniqueId((prevUniqueId) => (prevUniqueId += 1));
	};

	const deleteTask = (task: Task) => {
		setTasks(
			tasks.filter((item) => {
				return item !== task;
			})
		);
		setLocalStorageData(
			tasks.filter((item) => {
				return item !== task;
			})
		);
	};

	const changeStatus = (taskToUpdate: Task) => {
		setTasks((prevTasks) => {
			const updatedTask: Task[] = prevTasks.map((task) => {
				if (taskToUpdate === task) {
					return {
						...task,
						status:
							task.status === "PENDING" ? "COMPLETED" : "PENDING",
					};
				} else {
					return task;
				}
			});
			setLocalStorageData(updatedTask);
			return updatedTask;
		});
	};

	const pendingTasks = () => {
		return tasks.filter((task) => task.status === "PENDING");
	};

	const completedTasks = () => {
		return tasks.filter((task) => task.status === "COMPLETED");
	};

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === "task") {
				const newData = event.newValue
					? JSON.parse(event.newValue)
					: [];
				setTasks(newData);
			}
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	return (
		<TaskContext.Provider
			value={{
				tasks,
				uniqueId,
				addTask,
				deleteTask,
				changeStatus,
				pendingTasks,
				completedTasks,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export default TaskContextProvider;
