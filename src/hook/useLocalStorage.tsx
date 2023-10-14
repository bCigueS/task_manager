import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: []) => {
	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window === "undefined") return initialValue;
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error: any) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = (value: any) => {
		try {
			setStoredValue(value);
			if (typeof window !== "undefined") {
				localStorage.setItem(key, JSON.stringify(value));
			}
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	};
	return [storedValue, setValue];
};
