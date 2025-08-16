import React from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const useTheme = () => {
	const context = React.useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeContextProvider");
	}

	return context;
};

export { useTheme };
