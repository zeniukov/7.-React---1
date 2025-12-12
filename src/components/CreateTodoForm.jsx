import { useState, use } from 'react';
import styles from '../App.module.css';
import { UseDataContext } from '../context';

export const CreateTaskForm = () => {
	const [textValue, setTextValue] = useState('');
	const { createTodo, isLoading } = use(UseDataContext);

	const onSubmit = (event) => {
		event.preventDefault();
		if (textValue.trim() === '') return;
		createTodo(textValue);
		setTextValue('');
	};

	return (
		<form>
			<input
				className={styles.createTaskBlockInput}
				type="text"
				name="text"
				value={textValue}
				placeholder="Создайте новую задачу"
				onChange={({ target }) => setTextValue(target.value)}
			/>
			<button
				className={styles.createButton}
				onClick={onSubmit}
				type="submit"
				disabled={isLoading}
			>
				Создать
			</button>
		</form>
	);
};
