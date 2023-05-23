import {savedPost2} from "../../assets";
import ItemCategorySideBar from "../../components/SideBar/ItemCategorySideBar";

const SavedPost = () => {
	return (
		<div className="container mx-auto ">
			<h2 className="text-3xl font-medium my-4">Tin đã lưu</h2>
			<div className="grid grid-cols-12  gap-5">
				<div className="col-span-8">
					<div className="w-full rounded-lg shadow border py-10 bg-white">
						<div className="flex flex-col gap-2 items-center justify-center">
							<div className="w-[100px] h-[100px] flex-shrink-0">
								<img
									src={savedPost2}
									className="w-full h-full object-cover"
									alt=""
								/>
							</div>
							<p className="text-lg text-secondary font-bold">
								Danh sách rỗng.
							</p>
						</div>
					</div>
				</div>
				<div className="col-span-4">
					<ItemCategorySideBar />
				</div>
			</div>
		</div>
	);
};

export default SavedPost;
