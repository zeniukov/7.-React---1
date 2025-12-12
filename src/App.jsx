import { OpeningModulesProvider, UseDataProvider } from './hooks';
import { AppLayout } from './AppLayout';

// npx json-server@0.17.4 --watch src/db.json

export function App() {
	return (
		<>
			<OpeningModulesProvider>
				<UseDataProvider>
					<AppLayout />
				</UseDataProvider>
			</OpeningModulesProvider>
		</>
	);
}
