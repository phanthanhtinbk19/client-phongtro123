import {createContext, useContext, useState} from "react";
import {getAccessTokenFromLS} from "../utils/auth";
import {useQuery} from "@tanstack/react-query";
import {userApi} from "../api";

const initialAuthenticationContext = {
	isAuthenticated: Boolean(getAccessTokenFromLS()),
};

const AuthenticationContext = createContext(initialAuthenticationContext);

const AuthenticationProvider = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		initialAuthenticationContext.isAuthenticated
	);

	const {data: userData} = useQuery({
		queryKey: ["user"],
		queryFn: () => {
			return userApi.getCurrentUser();
		},
		enabled: isAuthenticated,
	});
	const profile = userData?.data?.data?.user;

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				profile,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};

const useAuthentication = () => {
	const context = useContext(AuthenticationContext);
	if (typeof context === "undefined") {
		throw new Error("useAuthentication must be within AuthenticationProvider");
	}
	return context;
};

export {AuthenticationProvider, useAuthentication};
