import {useEffect, useRef} from "react";
import ReactDOM from "react-dom";

const ModalLayout = ({onClose, children}) => {
	const modalRef = useRef();
	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (
				modalRef.current &&
				// @ts-ignore
				!modalRef.current?.contains(e.target) &&
				e.target.tagName.toLowerCase() !== "button"
			) {
				onClose();
			}
		};
		document.addEventListener("click", checkIfClickedOutside);
		return () => {
			document.removeEventListener("click", checkIfClickedOutside);
		};
	}, [onClose]);

	return ReactDOM.createPortal(
		<div className="fixed inset-0 flex justify-center items-center modal z-50">
			<div className="absolute inset-0 bg-black/25 overlay"></div>
			<div
				className="modal-content relative bg-white rounded-md w-full max-w-[700px] max-h-[500px] h-full overflow-y-auto z-10 p-4 overflow-hidden"
				ref={modalRef}
			>
				{children}
			</div>
		</div>,
		document.querySelector("body")
	);
};

export default ModalLayout;
