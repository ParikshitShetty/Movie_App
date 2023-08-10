import { useAtom } from 'jotai'
import React,{useState} from 'react'
import {searchResults} from '../jotai/Store'

const Search = () => {
    const [term,setTerm] = useState('');
    const [apiResults,setApiResults] = useAtom(searchResults);

    const handleSearch = (event) =>{
        setTerm(event.target.value)
    }

    const getData = async() =>{
        try {
            const url = `http://www.omdbapi.com/?s=${term}&apikey=faa9a7ed`; 
            const response = await fetch(url);
            const responseJson = await response.json();
            console.log(responseJson.Search)
            if (responseJson) {
                setApiResults(responseJson);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(apiResults)
  return (
    <>
        <span className='inline-flex'>
            <input type="text" className='p-2.5 rounded-l-lg z-30 dark:bg-gray-600 '
            placeholder='Search Movies....'
            value={term} 
            onChange={handleSearch}/>

            <button type="submit" className=" h-full px-2.5 py-[0.85rem] text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={getData}>
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </button>
        </span>
    </>
  )
}

export default Search