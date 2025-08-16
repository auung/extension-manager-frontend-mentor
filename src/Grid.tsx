import { cn } from "./utils";
import data from "./data.json";
import React from "react";
import Toggle from "./Toggle";
import { useTheme } from "./hooks/useTheme";

export type Extension = {
	logo: string;
	name: string;
	description: string;
	isActive: boolean;
};

const EXTENSIONS = data as Extension[];

type ButtonProps = {
	children: string;
	onClick: () => void;
	isSelected: boolean;
};

const Button = ({ isSelected, ...props }: ButtonProps) => {
	const { theme } = useTheme();

	return (
		<button
			className={cn(
				"text-sm bg-card-bg px-3 py-1.5 rounded-full shadow-xs cursor-pointer transition-colors border",
				theme === "dark" ? "border-neutral-600" : "border-neutral-200",
				{
					"bg-red-500 md:bg-red-700 text-neutral-100": isSelected,
					"text-neutral-900 font-medium": isSelected && theme == "dark",
				}
			)}
			{...props}
		/>
	);
};

type Filter = "all" | "active" | "inactive";
type LocalExtension = Extension & {
	isRemoved: boolean;
};

const Grid = () => {
	const [extensions, setExtensions] = React.useState<LocalExtension[]>(
		EXTENSIONS.map((item) => ({ ...item, isRemoved: false }))
	);
	const [filter, setFilter] = React.useState<Filter>("all");
	const extensionsToDisplay = extensions.filter(
		(item) =>
			!item.isRemoved &&
			((filter === "active" && item.isActive) ||
				(filter === "inactive" && !item.isActive) ||
				filter === "all")
	);

	function removeExtension(name: string) {
		setExtensions((prev) =>
			prev.map((item) =>
				name === item.name ? { ...item, isRemoved: true } : item
			)
		);
	}

	function toggleActive(name: string) {
		setExtensions((prev) =>
			prev.map((item) =>
				name === item.name ? { ...item, isActive: !item.isActive } : item
			)
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<header className="flex flex-col gap-4 items-center md:flex-row md:justify-between">
				<h2 className="text-3xl font-bold">Extensions List</h2>
				<div className="flex gap-2">
					<Button
						isSelected={filter === "all"}
						onClick={() => setFilter("all")}
					>
						All
					</Button>
					<Button
						isSelected={filter === "active"}
						onClick={() => setFilter("active")}
					>
						Active
					</Button>
					<Button
						isSelected={filter === "inactive"}
						onClick={() => setFilter("inactive")}
					>
						Inactive
					</Button>
				</div>
			</header>
			<main className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{extensionsToDisplay.map((item) => (
					<article
						key={item.name}
						className="bg-card-bg p-4 h-40 rounded-2xl flex flex-col justify-between"
					>
						<div className="flex items-start gap-4">
							<img
								src={item.logo}
								alt={`${item.name}-logo`}
								className="size-12"
							/>
							<div className="flex flex-col gap-1">
								<h3 className="font-bold">{item.name}</h3>
								<p className="text-sm text-neutral-500 tracking-tight">
									{item.description}
								</p>
							</div>
						</div>
						<div className="flex justify-between items-center">
							<button
								className="text-sm px-3 py-1 rounded-full border border-neutral-300 cursor-pointer"
								onClick={() => removeExtension(item.name)}
							>
								Remove
							</button>
							<Toggle
								active={item.isActive}
								onClick={() => toggleActive(item.name)}
							/>
						</div>
					</article>
				))}
			</main>
		</div>
	);
};

export default Grid;
