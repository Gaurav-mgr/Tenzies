import {useState, useEffect} from 'react'

import Preloader from './Preloader'

export default function Loading(){
  //preloader
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => {
        setIsLoading(false)
      },1300)
    }
    handlePageLoad()
  },[])

  return(
    <>
     <Preloader isLoading={isLoading}/>
    </>
  )
}