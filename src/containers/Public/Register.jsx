import {Link, useNavigate} from "react-router-dom";
import path from "../../constants/path";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../utils/schema";
import {authApi} from "../../api";
import {useMutation} from "@tanstack/react-query";
import {MyInput} from "../../components";

const Register = () => {
	const navigate = useNavigate();
	const registerAccountMutation = useMutation({
		mutationFn: (data) => authApi.registerAccount(data),
	});
	const {
		handleSubmit,
		control,
		formState: {errors},
	} = useForm({
		defaultValues: {
			name: "",
			phone: "",
			password: "",
			confirmPassword: "",
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit((data) => {
		// @ts-ignore
		registerAccountMutation.mutate(data, {
			onSuccess: () => {
				navigate(path.login);
			},
		});
	});
	return (
		<section className="bg-gray-50 w-full">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img
						className="w-8 h-8 mr-2"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
						alt="logo"
					/>
					Đăng ký
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 sm:p-8">
					<div className="p-6 space-y-4 md:space-y-6 ">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Create and account
						</h1>
						<form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
							<MyInput
								control={control}
								placeholder="name@company.com"
								label="Name"
								name="name"
								type="text"
								id="name"
								errorMessage={errors.name?.message}
							/>
							<MyInput
								control={control}
								placeholder="name@company.com"
								label="Phone"
								name="phone"
								type="text"
								id="phone"
								errorMessage={errors.phone?.message}
							/>
							<MyInput
								control={control}
								label="Password"
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								errorMessage={errors.password?.message}
							/>
							<MyInput
								control={control}
								label="Confirm Password"
								type="password"
								name="confirmPassword"
								id="confirmPassword"
								placeholder="••••••••"
								errorMessage={errors.confirmPassword?.message}
							/>

							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="terms"
										aria-describedby="terms"
										type="checkbox"
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="terms"
										className="font-light text-gray-500 dark:text-gray-300"
									>
										I accept the{" "}
										<Link
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
											to="#"
										>
											Terms and Conditions
										</Link>
									</label>
								</div>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Create an account
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Already have an account?{" "}
								<Link
									to={path.login}
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Register;
