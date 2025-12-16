import styles from './App.module.css';
import { CreateTaskForm, TodosList, Update, Delete } from './components/';

export function AppLayout() {

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
