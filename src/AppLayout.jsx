import styles from './App.module.css';
import { CreateTaskForm, TodosList, Update, Delete } from './components/';
import { UseDataContext } from './context';
import { use } from 'react';

export function AppLayout() {
	const { error } = use(UseDataContext);

	if (error) return <h1>{error}</h1>;

	return (
		<>
			<div id={styles.tasks}>
				<div className={styles.tasksWrapper}>
					<CreateTaskForm />
					<TodosList />
				</div>
			</div>
			<Delete />
			<Update />
		</>
	);
}
