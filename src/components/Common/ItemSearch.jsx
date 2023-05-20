const ItemSearch = ({
	defaultText,
	text,
	BeforeIcon,
	AfterIcon,
	name,
	setQueries,
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
		<>
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
		</>
	);
};

export default ItemSearch;
