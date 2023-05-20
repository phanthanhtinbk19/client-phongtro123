import ReactPaginate from "react-paginate";
import {createSearchParams, useNavigate} from "react-router-dom";
import path from "../../constants/path";

function Pagination({totalPage, queryConfig}) {
	const navigate = useNavigate();
	const handlePageClick = (event) => {
		navigate({
			pathname: path.home,
			search: createSearchParams({
				...queryConfig,
				page: (event.selected + 1).toString(),
			}).toString(),
		});
	};

	return (
		<>
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={1}
				pageCount={totalPage || 0}
				previousLabel="< prev"
				renderOnZeroPageCount={null}
				className="pagination"
			/>
		</>
	);
}
export default Pagination;
