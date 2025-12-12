import { useState } from 'react';
import { OpeningModulesContext } from '../context';

export const OpeningModulesProvider = ({ children }) => {
	const [openedDeleteModule, setOpenedDeleteModule] = useState(false);
	const [openedUpdateModule, setOpenedUpdateModule] = useState(false);
	const [id, setId] = useState('');
	const [title, setTitle] = useState('');

	const initiateDeleting = (id) => {
		setOpenedDeleteModule(!openedDeleteModule);
		setId(id);
	};

	const cancelDelete = () => {
		setOpenedDeleteModule(!openedDeleteModule);
		setId('');
	};

	const initiateUpdating = (id, titleValue) => {
		setOpenedUpdateModule(!openedUpdateModule);
		setId(id);
		setTitle(titleValue);
	};

	const cancelUpdate = () => {
		setOpenedUpdateModule(!openedUpdateModule);
		setId('');
	};

	return (
		<OpeningModulesContext
			value={{
				id,
				title,
				initiateDeleting,
				openedDeleteModule,
				cancelDelete,
				initiateUpdating,
				openedUpdateModule,
				cancelUpdate,
			}}
		>
			{children}
		</OpeningModulesContext>
	);
};
