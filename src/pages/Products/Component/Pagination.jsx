function Pagination(props) {
  const {
    currentPage,
    previousPage,
    hasPreviousPage,
    hasNextPage,
    nextPage,
    lastPage,
  } = props.pagination;
	console.log('props.pagination', props.pagination);
  return (
    <section className="pagination">
      {currentPage !== 1 && previousPage !== 1 && <a href="?page=1">1</a>}
      {hasPreviousPage && <a href={"?page=" + previousPage}>{previousPage}</a>}
      <a href={"?page=" + currentPage} className="active">
        {currentPage}
      </a>
      {hasNextPage && <a href={"?page=" + nextPage}>{nextPage}</a>}
      {lastPage !== currentPage && nextPage !== lastPage && (
        <a href={"?page=" + lastPage}>{lastPage}</a>
      )}
    </section>
  );
}

export default Pagination;
