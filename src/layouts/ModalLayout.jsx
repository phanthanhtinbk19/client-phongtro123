import ReactDOM from "react-dom";

const ModalLayout = ({onClose, children}) => {
	return ReactDOM.createPortal(
		<div className="fixed inset-0 flex justify-center items-center modal z-50">
			<div
				className="absolute inset-0 bg-black/50 overlay"
				onClick={onClose}
			></div>
			{/* <div className="modal-content relative bg-white rounded-md w-full max-w-[700px] max-h-[500px] h-full overflow-y-auto  z-10 ">
				
			</div> */}
			{children}
		</div>,
		document.querySelector("body")
	);
};

export default ModalLayout;
