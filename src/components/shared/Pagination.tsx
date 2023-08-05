import Button from '../ui/Button';

const Pagination = ({ currentPage, totalPages,setCurrentPage }:any) => {
  const pageRange = 5;
  const halfRange = Math.floor(pageRange / 2);
  const startPage = Math.max(currentPage - halfRange, 0);
  const endPage = Math.min(startPage + pageRange - 1, totalPages - 1);

  const pageNumbers = [];

  // add page numbers to the array
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-row w-auto gap-1">
      {startPage > 2 && <span className="dots">...</span>}
      {pageNumbers.map(number => (
        <Button key={number+1} variant="dark" className={`${currentPage === number+1 ? 'font-bold bg-primary' : ''} cursor-pointer`} onClick={() => setCurrentPage(number+1)}>
          {number + 1}
        </Button>
      ))}
      {endPage < totalPages - 1 && <span className="dots">...</span>}
    </div>
  );
};

export default Pagination;
