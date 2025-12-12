import { useState, useEffect, use } from 'react';
import styles from '../App.module.css';
import { UseDataContext } from '../context';
import { Todo } from './Todo';

const debounce = (func, delay) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	};
};

export const TodosList = () => {
	const [order, setOrder] = useState('');
	const handleOrder = () => setOrder((prev) => (prev === '' ? 'asc' : ''));

	const [searchText, setSearchText] = useState('');
	const delayedSetSearchText = debounce((newValue) => setSearchText(newValue), 300);
	const searchOnChange = ({ target }) => delayedSetSearchText(target.value);

	const { todos, isLoading, fetchData } = use(UseDataContext);

	useEffect(() => {
		fetchData(order, searchText);
	}, [order, searchText]);

	return (
		<div className={styles.todosContainer}>
			<form className={styles.filterBlock}>
				<label className={styles.filterBlockLabel}>
					Поиск задачи:
					<input
						type="text"
						name="text"
						className={styles.filterBlockInput}
						placeholder="Начните ввод"
						onChange={searchOnChange}
					/>
				</label>
			</form>

			<h1 className={styles.todosHeader}>
				Список дел:
				<button className={styles.button} onClick={handleOrder}>
					Сортировка по алфавиту
				</button>
			</h1>

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<ul className={styles.todoList}>
					{todos.map(({ id, title }) => (
						<Todo key={id} id={id} title={title} />
					))}
				</ul>
			)}
		</div>
	);
};
