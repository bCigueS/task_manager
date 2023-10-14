import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { Task } from "../typescript/types";
import TaskCard from "./TaskCard";
import ArrowDown from "../assets/arrow-down-svgrepo-com.svg";
import ArrowUp from "../assets/arrow-up-svgrepo-com.svg";

interface ContentProps {
	search: string;
}

const Content: React.FC<ContentProps> = ({ search }) => {
	const { tasks, pendingTasks, completedTasks } = useContext(TaskContext);
	const [pendingList, setPendingList] = useState<Task[]>([]);
	const [completedList, setCompletedList] = useState<Task[]>([]);
	const [displayPending, setDisplayPending] = useState<boolean>(true);
	const [displayCompleted, setDisplayCompleted] = useState<boolean>(true);

	const displayPendingHandler = () => {
		setDisplayPending(!displayPending);
	};

	const displayCompletedHandler = () => {
		setDisplayCompleted(!displayCompleted);
	};

	useEffect(() => {
		setPendingList(pendingTasks());
		setCompletedList(completedTasks());
	}, [tasks]);

	useEffect(() => {
		if (search !== "") {
			setPendingList(
				pendingTasks().filter((task) =>
					task.title
						.toLowerCase()
						.includes(search.trimStart().toLowerCase())
				)
			);
			setCompletedList(
				completedTasks().filter((task) =>
					task.title
						.toLowerCase()
						.includes(search.trimStart().toLowerCase())
				)
			);
		} else {
			setPendingList(pendingTasks());
			setCompletedList(completedTasks());
		}
	}, [search]);

	return (
		<>
			<div className="tasks-wrapper">
				<div className="tasks-header" onClick={displayPendingHandler}>
					<h2>Pending</h2>
					<img
						src={displayPending ? ArrowUp : ArrowDown}
						alt="arrow-down"
					/>
				</div>
				{displayPending && (
					<div className="cards-wrapper">
						{pendingList.map((task: Task) => {
							return <TaskCard key={task.id} task={task} />;
						})}
					</div>
				)}
			</div>
			<div className="tasks-wrapper">
				<div className="tasks-header" onClick={displayCompletedHandler}>
					<h2>Completed</h2>
					<img
						src={displayCompleted ? ArrowUp : ArrowDown}
						alt="arrow-down"
					/>
				</div>
				{displayCompleted && (
					<div className="cards-wrapper">
						{completedList.map((task: Task) => {
							return <TaskCard key={task.id} task={task} />;
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default Content;
