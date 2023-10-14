import { useContext, useState } from "react";
import { Task } from "../typescript/types";
import { TaskContext } from "../context/TaskContext";
import PlusIcon from "../assets/plus-svgrepo-com.svg";

const AddTaskForm: React.FC = () => {
	const { uniqueId, addTask } = useContext(TaskContext);
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [titleError, setTitleError] = useState<string>("");
	const [descriptionError, setDescriptionError] = useState<string>("");
	const [taskAdded, setTaskAdded] = useState<"Success" | "Failure">(
		"Success"
	);
	const [displaySuccessStatus, setDisplaySuccessStatus] =
		useState<boolean>(false);

	
	const successHandler = () => {
		setDisplaySuccessStatus(true);
		setTimeout(() => {
			setDisplaySuccessStatus(false);
		}, 5000);
	}

	const resetError = () => {
		setDescriptionError("");
		setTitleError("");
	};

	const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value);
	};

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		resetError();

		const formData = new FormData(event.currentTarget);
		const title = formData.get("title");
		const description = formData.get("description");

		if (!title || !description) {
			if (!title) {
				setTitleError("Please enter a title");
			}
			if (!description) {
				setDescriptionError("Please enter a description");
			}
			setTaskAdded('Failure');
			successHandler();
			return;
		}
		const trimTitle = title.toString().trimStart();
		const trimDescription = description.toString().trimStart();

		if (trimTitle === "" || trimDescription === "") {
			if (trimTitle === "") {
				setTitleError("Please enter a title");
			}
			if (trimDescription === "") {
				setDescriptionError("Please enter a description");
			}
			setTaskAdded('Failure');
			successHandler();
			return;
		}

		const newTask: Task = {
			id: uniqueId,
			title: trimTitle.toString().trimEnd(),
			description: trimDescription.toString().trimEnd(),
			status: "PENDING",
		};

		addTask(newTask);
		setTaskAdded('Success');
		successHandler();
		setTitle("");
		setDescription("");
	};

	return (
		<form className="task-form" onSubmit={submitHandler}>
			<div className="task-form__title">
				<label>Title*</label>
				<input
					type="text"
					name="title"
					id="title"
					placeholder="Title..."
					maxLength={30}
					autoComplete="off"
					value={title}
					onChange={titleHandler}
				/>
				{titleError.length !== 0 && (
					<p className="error">{titleError}</p>
				)}
			</div>
			<div className="task-form__description">
				<label>Description*</label>
				<input
					name="description"
					id="description"
					maxLength={200}
					placeholder="Enter task description, 200 char max"
					autoComplete="off"
					value={description}
					onChange={descriptionHandler}
				></input>
				{descriptionError.length !== 0 && (
					<p className="error">{descriptionError}</p>
				)}
			</div>
			<div className="task-form__footer">
				<button className="new-task-button">
					<img src={PlusIcon} alt="" />
					<p>New Task</p>
				</button>
				{displaySuccessStatus && (
					<div>
						<p style={taskAdded === "Success" ? {color: '#96c291'} : {color: '#fe7c7c'}}>
							{taskAdded}
						</p>
					</div>
				)}
			</div>
		</form>
	);
};

export default AddTaskForm;
