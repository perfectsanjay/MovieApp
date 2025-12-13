import React, { useState,useEffect } from 'react'
import Search from './components/search';
import Spinner from './components/spinner';

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
  
  }

const App = () => {
const [searchTerm, setSearchTerm] = useState('')
const [errorMessge, setErrorMessage] = useState('')
const [movieList, setMovieList] = useState([])
const [isLoading, setIsLoading] = useState(false)

const fetchMovies = async () => {
  setIsLoading(true)
  setErrorMessage('')
  try{
    const endpoint = `${API_BASE_URL}?sort_by=popularity.desc`
    const response = await fetch(endpoint, API_OPTIONS)
    if(!response.ok){
      throw new Error('failed to fetch movies')
    }
    
    const data = await response.json()

    if(data.response =='False'){
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMovieList([])
        return
      }
      setMovieList(data.results ||[])
    

  }catch(error){
    console.log(`Error fetching movies: ${error}`)
    setErrorMessage("Error fetching movies please try again")

  }finally{
    setIsLoading(false)
  }
}

useEffect(() => {
  fetchMovies();
}, []) 
  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy without Hassle</h1>
        <Search searchTerm = {searchTerm}  setSearchTerm ={setSearchTerm} />
      </header>

      <section className='all-movies'>
        <h1 className="mt-100px">All movies</h1>
        {isLoading ? (<Spinner/>): errorMessge ? (<p className='text-red-500'>{errorMessge}</p>):(
          <ul>
            {movieList.map((movie) => (
              <p key={movie.id} className='text-white'>{movie.title}</p>
            ))}
          </ul>
        ) }
      </section>
      

      </div>
    </main>
      
   
  )
}

export default App
