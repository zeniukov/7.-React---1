import styles from '../App.module.css';
import { use, useState } from 'react';
import { OpeningModulesContext, UseDataContext } from '../context';

export const Delete = () => {
	const [isDelete, setIsDelete] = useState(false);

	const { id, openedDeleteModule, cancelDelete } = use(OpeningModulesContext);
	const { deleteTodo } = use(UseDataContext);

	const confirmDelete = async () => {
		setIsDelete(true);
		await deleteTodo(id);
		setIsDelete(false);
		cancelDelete();
	};

	return (
		<div className={openedDeleteModule ? styles.modalOverlay : styles.modalOverlayHidden}>
			<div className={styles.actionModal}>
				<h3 className={styles.actionModalQuestion}>
					Вы действительно хотите удалить эту задачу?
				</h3>
				<div className={styles.actionModalButtons}>
					<button
						className={`${styles.button} ${styles.cancelButton}`}
						disabled={isDelete}
						onClick={cancelDelete}
					>
						Отмена
					</button>

					<button
						className={`${styles.button} ${styles.confirmButton}`}
						disabled={isDelete}
						onClick={confirmDelete}
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
};
