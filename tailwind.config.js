/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#1266dd",
				secondary: "#f73859",
				green: "#13bb7b",
				orange: "#febb02",
				bgGray: "#f5f5f5",
			},
		},
		// backgroundColor: {
		// 	primary: "#1266dd",
		// 	secondary: "#f73859",
		// },
	},
	// eslint-disable-next-line no-undef
	plugins: [require("@tailwindcss/line-clamp")],
};
