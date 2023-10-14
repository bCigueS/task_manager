import AddTaskForm from "./components/TaskForm";
import HeaderContent from "./components/HeaderContent";
import Content from "./components/Content";
import { useState } from "react";
import Search from "./components/Search";

function App() {
	const [searchFilter, setSearchFilter] = useState<string>('');

	const onSaveSearchInput = (search: string) => {
		setSearchFilter(search);
	}

	return (
		<>
			<HeaderContent />
			<main>
				<AddTaskForm />
				<Search onSave={onSaveSearchInput} />
				<Content search={searchFilter}/>
			</main>
		</>
	);
}

export default App;
