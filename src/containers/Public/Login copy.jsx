import {useForm} from "react-hook-form";
import {schema} from "../../utils/schema";
import {yupResolver} from "@hookform/resolvers/yup";
import {Link, useNavigate} from "react-router-dom";
import {authApi} from "../../api";
import {useMutation} from "@tanstack/react-query";
import {MyInput} from "../../components";
import path from "../../constants/path";

const Login = () => {
	// const navigate = useNavigate();
	// const loginAccountMutation = useMutation({
	// 	mutationFn: (data) => authApi.loginAccount(data),
	// });

	const {
		handleSubmit,
		control,
		formState: {errors},
	} = useForm({
		defaultValues: {
			phone: "",
			password: "",
		},
		resolver: yupResolver(schema),
	});
	const onSubmit = handleSubmit((data) => {
		console.log(data);
		// @ts-ignore
		// loginAccountMutation.mutate(data, {
		// 	onSuccess: () => {
		// 		navigate("/");
		// 	},
		// });
	});
	return (
		<section className="bg-gray-50 w-full">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full ">
				<Link
					to="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img
						className="w-8 h-8 mr-2"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
						alt="logo"
					/>
					Đăng nhập
				</Link>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
					<div className="p-6 space-y-4 md:space-y-6 ">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
							<MyInput
								control={control}
								placeholder="name@company.com"
								label="	Your phone"
								name="phone"
								type="number"
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

							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="remember"
											className="text-gray-500 dark:text-gray-300"
										>
											Remember me
										</label>
									</div>
								</div>
								<a
									href="#"
									className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Forgot password?
								</a>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
							>
								Sign in
							</button>

							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?{" "}
								<Link
									to={path.register}
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
