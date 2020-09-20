import React, { useState } from "react"
import { Pagination } from "react-bootstrap";
export const PaginationComponent = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const [active, SetActive] = useState(currentPage);


  const handleClick = (number) => {
    paginate(number);
    SetActive(number);
  };


  let pageItems = [];
  for (let i = 1; i <= Math.ceil(totalPosts.length / postsPerPage); i++) {
    pageItems.push(
      <Pagination.Item key={i} active={i === active} onClick={() => handleClick(i)}>
        {i}
      </Pagination.Item>,
    );
  }
  return (
    <div>
      <Pagination>{pageItems}</Pagination>
    </div>
  )

}