import {useController} from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const MyReactQuill = ({control, errorMessage, ...props}) => {
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
			<ReactQuill theme="snow" className="w-full " {...field} {...props} />

			<div className="text-sm text-red-500">{errorMessage}</div>
		</div>
	);
};

export default MyReactQuill;
