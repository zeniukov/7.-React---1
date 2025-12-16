import { use } from 'react';
import styles from '../App.module.css';
import { UseDataContext } from '../context';
import { Todo } from './Todo';

export const TodosList = () => {
	const { todos, searchText, handleOrder, searchOnChange } = use(UseDataContext);

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
						value={searchText}
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

			<ul className={styles.todoList}>
				{todos.map(({ id, title }) => (
					<Todo key={id} id={id} title={title} />
				))}
			</ul>
		</div>
	);
};
