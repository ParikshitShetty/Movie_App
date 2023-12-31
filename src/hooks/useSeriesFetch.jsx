import { useAtom } from 'jotai';
import React,{useState,useEffect,useRef} from 'react'
import { series } from '../jotai/List';


const useSeriesFetch = (length) => {
    const [tvShows] = useAtom(series);

    const [seriesResults, setSeriesResults] = useState([]);
    const render = useRef(true);

    useEffect(() => {
        if(render.current){//useffect mounts and dismounts twice because of Strictmode so we need a condition
          render.current = false;
          for (let i = 0; i < length; i++) {
            fetch(`${import.meta.env.VITE_TITLE}${tvShows[i]}&apikey=${import.meta.env.VITE_KEY}`).
              then((res)=>res.json()).
              then((respJson)=> setSeriesResults((prev)=>[
                ...prev,respJson
            ])).catch((error) => {
              console.error('Error fetching data:', error);
            });
          }
        }
      },[])
  return seriesResults
}

export default useSeriesFetch