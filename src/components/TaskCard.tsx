import { useContext } from "react";
import { Task } from "../typescript/types";
import { TaskContext } from "../context/TaskContext";
import Button from "./Button";

interface TaskCardProps {
	task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	const { deleteTask, changeStatus } = useContext(TaskContext);


	const deleteTaskHandler = () => {
		deleteTask(task);
	};

	const statusHandler = () => {
		changeStatus(task);
	};


	return (
		<div className="task-card">
			<div>
				<div className="task-card__header">
					<h2 className="task-card__header--title">{task.title}</h2>
					<p className="task-card__header--status" style={task.status === 'PENDING' ? {color: '#FFDBAA' } : {color: '#96c291'}}>{task.status}</p>
				</div>
				<p className="task-card__description">{task.description}</p>
			</div>
			<div className="task-card__footer">
				<Button onClick={statusHandler} label={task.status === 'COMPLETED' ? 'Pending' : 'Complete'} />
				<Button onClick={deleteTaskHandler} label="Delete" />
			</div>
		</div>
	);
};

export default TaskCard;
