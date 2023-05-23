import {getNumbersArea, getNumbersPrice} from "./common";
const getCodeArrPrice = (prices, arr) => {
	const codePrices = prices?.map((item) => {
		return {
			...item,
			rangePrice: getRangePrice(getNumbersPrice(item?.value)),
		};
	});

	const result = codePrices?.find((item) => {
		return JSON.stringify(item?.rangePrice) === JSON.stringify(arr);
	});

	return result;
};
const getCodePrice = (prices, value) => {
	const codePrices = prices?.map((item) => {
		return {
			...item,
			rangePrice: getRangePrice(getNumbersPrice(item?.value)),
		};
	});
	const result = codePrices?.find((item) => {
		return item.rangePrice[0] <= value && value < item.rangePrice[1];
	});
	return result?.code;
};
const getRangePrice = (data) => {
	if (data.length === 1 && data[0] === 1) {
		return [0, 1];
	} else if (data.length === 1 && data[0] === 15) {
		return [15, 999999];
	} else {
		return data;
	}
};

const getCodeArea = (areas, value) => {
	const codeAreas = areas?.map((item) => {
		return {
			...item,
			rangeArea: getRangeArea(getNumbersArea(item?.value)),
		};
	});

	const result = codeAreas?.find((item) => {
		return item.rangeArea[0] <= value && value < item.rangeArea[1];
	});
	return result?.code;
};
const getRangeArea = (data) => {
	if (data.length === 1 && data[0] === 20) {
		return [0, 20];
	} else if (data.length === 1 && data[0] === 90) {
		return [90, 999999];
	} else {
		return data;
	}
};

export {getCodePrice, getCodeArea, getCodeArrPrice};
