import ReactPaginate from "react-paginate";
import {createSearchParams, useLocation, useNavigate} from "react-router-dom";

function Pagination({totalPage, queryConfig}) {
	const location = useLocation();

	const navigate = useNavigate();
	const handlePageClick = (event) => {
		navigate({
			pathname: location.pathname,
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
