import styles from '../App.module.css';
import { useEffect, useState } from 'react';
import { UseDataContext } from '../context';

const debounce = (func, delay) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	};
};

export const UseDataProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const [order, setOrder] = useState('');
	const handleOrder = () => setOrder((prev) => (prev === '' ? 'asc' : ''));

	const [searchText, setSearchText] = useState('');
	const delayedSetSearchText = debounce((newValue) => setSearchText(newValue), 500);
	const searchOnChange = ({ target }) => {
		delayedSetSearchText(target.value);
	}

	const fetchData = async (order, searchText) => {
		setIsLoading(true);
		let params = [];
		if (order) {
			params.push(`_sort=title`);
			params.push(`order=${order}`);
		}
		if (searchText) params.push(`q=${searchText}`);

		params = params.length > 0 ? `?${params.join('&')}` : '';

		try {
			const response = await fetch(`http://localhost:3000/todos${params}`);
			if (!response.ok) throw new Error('Network response was not ok');
			const data = await response.json();
			setTodos(data);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const createTodo = async (payload) => {
		setIsLoading(true);
		try {
			const response = await fetch('http://localhost:3000/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({ title: payload }),
			});
			if (!response.ok) throw new Error('Network response was not ok');
			const newTodo = await response.json();
			setTodos(todos.concat(newTodo));
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const updateTodo = async (id, payload) => {
		setIsLoading(true);
		try {
			const response = await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify({ title: payload }),
			});
			if (!response.ok) throw new Error('Network response was not ok');
			const updatedTodo = await response.json();
			setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const deleteTodo = async (id) => {
		try {
			const response = await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error('Network response was not ok');

			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData(order, searchText);
	}, [order, searchText]);

	if (isLoading) return <div className={styles.loader}></div>;

	if (error) return <h1>{error}</h1>;

	return (
		<UseDataContext
			value={{
				handleOrder,
				searchOnChange,
				searchText,
				todos,
				isLoading,
				error,
				createTodo,
				updateTodo,
				deleteTodo,
			}}
		>
			{children}
		</UseDataContext>
	);
};
