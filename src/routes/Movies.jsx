import React, { useState,useEffect,useRef } from 'react'
import { useAtom } from 'jotai';
import { movies } from '../jotai/List';
import Pagination from '../components/Pagination';
import useMovieFetch from '../hooks/useMovieFetch';
import RouteRenderer from '../components/renderer/RouteRenderer';
import Loading from '../utilities/Loading';

const Movies = () => {
  const [movieList] = useAtom(movies);

  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(12);

  const apiResults = useMovieFetch(postsPerPage);

  const [results,setResults] = useState([]);
  const render = useRef(false);

  const getData = () =>{
    setResults([]);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    for (let i = firstPostIndex; i < lastPostIndex; i++) {
      fetch(`${import.meta.env.VITE_TITLE}${movieList[i]}&apikey=${import.meta.env.VITE_KEY}`).
        then((res)=>res.json()).
        then((respJson)=> setResults((prev)=>[
          ...prev,respJson
      ])).catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  }

  useEffect(()=>{
    if (currentPage === 2) {
      render.current = true;
    }
    if (render.current) {
      getData();
    }
  },[currentPage])
  
  useEffect(()=>{
    setResults(apiResults);
  },[apiResults])
  
  return (
    <>
    <div className='flex flex-col h-[190vh]'>
      {results.length === 12 ?
      <main className='grid place-items-start grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4
       sm:my-8 sm:mx-8'>
          <RouteRenderer results={results}/>
      </main>
        : <Loading/>
      }
      {results.length > 0 &&
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      }
    </div>
    </>
  )
}
export default Movies