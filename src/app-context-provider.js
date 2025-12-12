export const AppContextProvider = ({
	themeValue,
	userValue,
	appConfigValue,
	children,
}) => {
	return (
		<ThemeContext value={themeValue}>
			<UserDataContext value={userValue}>
				<AppConfigContext value={appConfigValue}>{children}</AppConfigContext>
			</UserDataContext>
		</ThemeContext>
	);
};
