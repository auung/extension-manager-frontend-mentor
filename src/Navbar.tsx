import logoIcon from "./assets/images/logo.svg";
import moonIcon from "./assets/images/icon-moon.svg";
import sunIcon from "./assets/images/icon-sun.svg";
import { useTheme } from "./hooks/useTheme";
import { cn } from "./utils";

const Navbar = () => {
	const { theme, toggleTheme } = useTheme();
	const themeIconSrc = theme === "light" ? moonIcon : sunIcon;

	return (
		<nav
			className={cn("flex justify-between p-2.5 rounded-xl bg-card-bg shadow")}
		>
			<h1 className="text-2xl font-bold">
				<a href="./" className="flex items-center gap-2">
					<img src={logoIcon} alt="extensions-logo" className="h-8" />
					<span className={cn("text-xl")}>Extensions</span>
				</a>
			</h1>
			<button
				className={cn(
					"size-8 rounded-lg flex-center p-2 cursor-pointer bg-btn-bg"
				)}
				onClick={toggleTheme}
			>
				<img src={themeIconSrc} alt="Extensions" />
			</button>
		</nav>
	);
};

export default Navbar;
