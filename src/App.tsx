import { ThemeContextProvider } from "./contexts/ThemeContext";
import Grid from "./Grid";
import Navbar from "./Navbar";

function App() {
	return (
		<ThemeContextProvider>
			<div className="py-4 w-4/5 max-w-[1032px] min-w-64 mx-auto text-body-text flex flex-col gap-8">
				<Navbar />
				<Grid />
			</div>
		</ThemeContextProvider>
	);
}

export default App;
