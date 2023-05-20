import {Buffer} from "buffer";
const fileToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};

const blobToBase64 = (image) => new Buffer(image, "base64").toString("binary");
export {fileToBase64, blobToBase64};
