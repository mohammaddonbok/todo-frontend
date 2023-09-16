import React from 'react'
import Button from '@mui/material/Button';

const Paginations = ({totalPosts,postsPerPage, setCurrentPage}) => {
    let pages = [];
    for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }
  return (
    <div className='pagination'>
        {
            pages.map((page,index)=>{
                return <Button variant="contained" key={index} onClick={() => setCurrentPage(page)}>
                {page}</Button>
            })
        }
    </div>
  )
}

export default Paginations