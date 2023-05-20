import {useController} from "react-hook-form";

const MyInputV2 = ({control, errorMessage, ...props}) => {
	const {field} = useController({
		name: props.name,
		control,
		defaultValue: "",
	});

	return (
		<div>
			<label
				htmlFor={props.id || props.name}
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				{props.label}
			</label>
			<div className="flex">
				<input
					className="rounded-none rounded-l-lg  border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 bg-white"
					{...field}
					{...props}
				/>
				<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md ">
					{props.kind}
				</span>
			</div>
			<div className="text-sm text-red-500">{errorMessage}</div>
		</div>
	);
};

export default MyInputV2;
