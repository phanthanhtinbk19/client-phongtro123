import {useController} from "react-hook-form";

const MySelect = ({control, errorMessage, options, ...props}) => {
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
			<select
				className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
				{...field}
				{...props}
			>
				<option value="">{`--Chọn ${props.label}--`}</option>
				{options?.map((item, index) => {
					return props.name === "province" ? (
						<option key={index} value={item.province_id}>
							{item.province_name}
						</option>
					) : (
						<option key={index} value={item.district_id}>
							{item.district_name}
						</option>
					);
				})}
			</select>
			<div className="text-sm text-red-500">{errorMessage}</div>
		</div>
	);
};

export default MySelect;
