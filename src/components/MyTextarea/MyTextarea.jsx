import {useController} from "react-hook-form";

const MyTextarea = ({control, errorMessage, className, ...props}) => {
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
			<textarea
				className={`border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${className}`}
				{...field}
				{...props}
			></textarea>
			<input />
			<div className="text-sm text-red-500">{errorMessage}</div>
		</div>
	);
};

export default MyTextarea;
