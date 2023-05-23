const extractLocation = (address) => {
	// Split the address by comma
	const parts = address.split(",");

	// Get the last two parts, which represent the desired location
	const locationParts = parts.slice(-2);

	// Join the location parts with a comma and remove any leading/trailing spaces
	const location = locationParts.join(",").trim();

	return location;
};

const getNumbersPrice = (string) =>
	string
		.split(" ")
		.map((item) => +item)
		.filter((item) => !item === false);
const getNumbersArea = (string) =>
	string
		.split(" ")
		.map((item) => +item.match(/\d+/))
		.filter((item) => item !== 0);

const convert100toTarget = (percent, name) => {
	return name === "price"
		? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
		: name === "area"
		? Math.ceil(Math.round(percent * 0.9) / 5) * 5
		: 0;
};
const convertto100 = (percent, name) => {
	let target = name === "price" ? 15 : name === "area" ? 90 : 1;
	return Math.floor((percent / target) * 100);
};

const provinceLocation = (category) => {
	if (category === "CTCH") {
		return [
			{
				name: "Căn hộ Hồ Chí Minh",
				image: "https://phongtro123.com/images/location_hcm.jpg",
			},
			{
				name: "Căn hộ Hà Nội",
				image: "	https://phongtro123.com/images/location_hn.jpg",
			},
			{
				name: "Căn hộ Đà Nẵng",
				image: "https://phongtro123.com/images/location_dn.jpg",
			},
		];
	} else if (category === "CTMB") {
		return [
			{
				name: "Mặt bằng nhà Hồ Chí Minh",
				image: "https://phongtro123.com/images/location_hcm.jpg",
			},
			{
				name: "Mặt bằng nhà Hà Nội",
				image: "	https://phongtro123.com/images/location_hn.jpg",
			},
			{
				name: "Mặt bằng nhà Đà Nẵng",
				image: "https://phongtro123.com/images/location_dn.jpg",
			},
		];
	} else if (category === "CTPT") {
		return [
			{
				name: "Phòng trọ Hồ Chí Minh",
				image: "https://phongtro123.com/images/location_hcm.jpg",
			},
			{
				name: "Phòng trọ Hà Nội",
				image: "	https://phongtro123.com/images/location_hn.jpg",
			},
			{
				name: "Phòng trọ Đà Nẵng",
				image: "https://phongtro123.com/images/location_dn.jpg",
			},
		];
	} else {
		return [
			{
				name: "Cho thuê nhà Hồ Chí Minh",
				image: "https://phongtro123.com/images/location_hcm.jpg",
			},
			{
				name: "Cho thuê nhà Hà Nội",
				image: "	https://phongtro123.com/images/location_hn.jpg",
			},
			{
				name: "Cho thuê nhà Đà Nẵng",
				image: "https://phongtro123.com/images/location_dn.jpg",
			},
		];
	}
};
const isValidJSON = (jsonString) => {
	try {
		JSON.parse(jsonString);
		return true;
	} catch (error) {
		return false;
	}
};
export {
	isValidJSON,
	extractLocation,
	getNumbersPrice,
	getNumbersArea,
	convert100toTarget,
	convertto100,
	provinceLocation,
};
