import React, { useState } from "react";

interface SearchProps {
	onSave: (search: string) => void;
}
const Search: React.FC<SearchProps> = ({ onSave }) => {
	const [input, setInput] = useState<string>("");

	const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	};

	const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSave(input);
		setInput("");
	};

	const onResetHandler = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		setInput("");
		onSave(input);
	};
	return (
		<form className="search-wrapper" onSubmit={onSubmitHandler}>
			<div className="search__title">
				<label htmlFor="search">Search</label>
				<input
					id="search"
					name="search"
					placeholder="Enter your search..."
					autoComplete="off"
					type="text"
					value={input}
					onChange={inputHandler}
				/>
			</div>
			<div className="search__buttons">
				<button className="search__buttons--elem" type="submit">
					Search
				</button>
				<button
					className="search__buttons--elem"
					onClick={onResetHandler}
				>
					Reset
				</button>
			</div>
		</form>
	);
};

export default Search;
