import React, { useEffect, useState } from "react"
import { Pagination } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllPosts, fetchPosts, setPagination } from "./postSlice";
import { PaginationComponent } from "./Pagination";
import { Posts } from "./Posts";

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const pageNumber = useSelector(state => state.posts.pagination.page);

  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  const [currentPage, SetCurrentPage] = useState(pageNumber);
  const [postsPerPage, SetPostsPerPage] = useState(6);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content;
  if (postStatus === 'loading') {
    content = <div>Loading...</div>
  } else if (postStatus === 'succeeded') {

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    console.log(currentPosts);

    const paginate = (number) => {
      dispatch(setPagination(number));
      SetCurrentPage(number)
    };

    content = (
      <>
        <div className="d-flex justify-content-center align-items-center text-center">
          <PaginationComponent postsPerPage={postsPerPage} totalPosts={posts} paginate={paginate} currentPage={currentPage} />
        </div>
        <Posts posts={currentPosts} />
      </>
    )

  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }


  return (
    <section className="posts-list-section">
      <h2 className="posts-heading text-center">Posts</h2>
      {content}

    </section>
  )
}