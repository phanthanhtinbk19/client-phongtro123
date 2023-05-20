import {useQuery} from "@tanstack/react-query";
import {provinceApi} from "../../api";

const Address = () => {
	const {data: provincesData} = useQuery({
		queryKey: ["listPublicProvince"],
		queryFn: () => {
			return provinceApi.getPublicProvinces();
		},
	});
	console.log(provincesData);
	return (
		<div>
			<h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-4"></div>
				{/* <InputReadOnly
					label="Địa chỉ chính xác"
					value={`${
						district
							? `${
									districts?.find((item) => item.district_id === district)
										?.district_name
							  },`
							: ""
					} ${
						province
							? provinces?.find((item) => item.province_id === province)
									?.province_name
							: ""
					}`}
				/> */}
			</div>
		</div>
	);
};

export default Address;
