import React from "react";

type Theme = "light" | "dark";
type ThemeContextProps = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextProps | null>(null);

type ThemeProviderProps = {
	children: React.JSX.Element;
};

const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = React.useState<Theme>("light");

	function toggleTheme() {
		setTheme((prevTheme) => {
			switch (prevTheme) {
				case "light":
					localStorage.setItem("theme", "dark");
					return "dark";
				case "dark":
					localStorage.setItem("theme", "light");
					return "light";
			}
		});
	}

	React.useLayoutEffect(() => {
		const currentTheme = localStorage.getItem("theme");
		if (currentTheme) {
			setTheme(currentTheme as Theme);
		}

		document.documentElement.classList.toggle(
			"dark",
			theme === "dark" ||
				(!currentTheme &&
					window.matchMedia("(prefers-color-scheme: dark)").matches)
		);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContextProvider, ThemeContext };
