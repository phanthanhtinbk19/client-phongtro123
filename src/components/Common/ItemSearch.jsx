const ItemSearch = ({
	defaultText,
	text,
	BeforeIcon,
	AfterIcon,
	name,
	setQueries,
	onClick = () => {},
}) => {
	const handleDeleteItem = (e) => {
		e.stopPropagation();
		setQueries((prev) => {
			let newQueries = {...prev};
			delete newQueries[name];
			return newQueries;
		});
	};
	return (
		<div
			className="p-2 rounded-md flex items-center bg-white cursor-pointer"
			onClick={onClick}
		>
			<BeforeIcon size={15} className="text-gray-600" />
			<span
				className={` pl-1 text-sm backdrop:${
					text ? "text-black font-bold" : "text-gray-600"
				}`}
			>
				{text || defaultText}
			</span>
			<AfterIcon
				size={15}
				className="ml-auto text-gray-600"
				onClick={handleDeleteItem}
			/>
		</div>
	);
};

export default ItemSearch;
