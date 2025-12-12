import styles from '../App.module.css';
import { useState, useEffect, use } from 'react';
import { OpeningModulesContext, UseDataContext } from '../context';

export const Update = () => {
	const { id, title, openedUpdateModule, cancelUpdate } = use(OpeningModulesContext);
	const { updateTodo } = use(UseDataContext);

	const [isUpdate, setIsUpdate] = useState(false);
	const [updatedValue, setUpdatedValue] = useState(title);

	useEffect(() => {
		setUpdatedValue(title);
	}, [title]);

	const confirmUpdate = async (payload) => {
		setIsUpdate(true);
		if (updatedValue.trim() === '') return;
		await updateTodo(id, payload);
		setIsUpdate(false);
		cancelUpdate();
	};
	return (
		<div className={openedUpdateModule ? styles.modalOverlay : styles.modalOverlayHidden}>
			<div className={styles.actionModal}>
				<form className={styles.updateTaskBlock}>
					<input
						className={styles.updateTaskBlockInput}
						type="text"
						name="text"
						value={updatedValue}
						placeholder="Введите новый текст"
						onChange={(e) => setUpdatedValue(e.target.value)}
					/>
				</form>

				<div className={styles.actionModalButtons}>
					<button
						className={`${styles.button} ${styles.cancelButton}`}
						disabled={isUpdate}
						onClick={cancelUpdate}
					>
						Отмена
					</button>

					<button
						className={`${styles.button} ${styles.confirmButton}`}
						disabled={isUpdate}
						onClick={confirmUpdate.bind(null, updatedValue)}
					>
						Обновить
					</button>
				</div>
			</div>
		</div>
	);
};
