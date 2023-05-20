import {Link} from "react-router-dom";

const Button = ({
	children,
	type,
	className,
	BeforeIcon,
	AfterIcon,
	to = "",
	onClick = () => {},
}) => {
	return (
		<>
			{to ? (
				<Link
					to={to}
					className={`p-2 rounded-md gap-1  flex items-center justify-center  ${className}`}
				>
					{BeforeIcon && <BeforeIcon />}
					{children}
					{AfterIcon && <AfterIcon />}
				</Link>
			) : (
				<button
					type={type}
					className={`p-2 rounded-md gap-1 flex justify-center  items-center  ${className}`}
					onClick={onClick}
				>
					{BeforeIcon && <BeforeIcon />}
					{children}
					{AfterIcon && <AfterIcon />}
				</button>
			)}
		</>
	);
};

export default Button;
