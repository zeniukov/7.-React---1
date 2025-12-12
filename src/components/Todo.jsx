import { use } from 'react';
import styles from '../App.module.css';
import { OpeningModulesContext } from '../context';

export const Todo = ({ title, id }) => {
	const { initiateDeleting, initiateUpdating } = use(OpeningModulesContext);

	return (
		<li className={styles.taskItem}>
			{title}
			<button className={styles.button} onClick={initiateDeleting.bind(null, id)}>
				Удалить
			</button>

			<button className={styles.button} onClick={initiateUpdating.bind(null, id, title)}>
				Обновить
			</button>
		</li>
	);
};
