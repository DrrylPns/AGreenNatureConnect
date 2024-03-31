import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

export default function PaginationSection ({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage
  
  }:{
    totalItems:any,
    itemsPerPage:any,
    currentPage:any,
    setCurrentPage:any
    
  }){
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++){
      pages.push(i)
    }
  
    const handleNextPage = () =>{
      if(currentPage < pages.length){
        setCurrentPage(currentPage + 1);
        console.log(currentPage)
      }
    };
    const handlePrevPage = () =>{
      if(currentPage > 1){
        setCurrentPage(currentPage - 1);
        console.log(currentPage)
      }
    };
  
    
    return (
     <Pagination className="my-10">
      <PaginationContent>
        <PaginationItem className=" hover:cursor-pointer">
          <PaginationPrevious onClick={() => handlePrevPage()} />
        </PaginationItem>
  
        {pages.map((page, idx) => (
          <PaginationItem 
            key={idx} 
            className={currentPage === page ? "bg-neutral-100 rounded-md" : "hover:cursor-pointer"}
          >
            <PaginationLink onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem  className=" hover:cursor-pointer">
          <PaginationNext onClick={()=> handleNextPage()}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    )
  }