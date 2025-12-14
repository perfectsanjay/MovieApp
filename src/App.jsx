import React, { useState, useEffect } from 'react'
import Search from './components/search'
import Spinner from './components/spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { updateSearchCount } from './appwrite'

const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('')

  useDebounce(() => 
    setDebounceSearchTerm(searchTerm)
  , 500 , [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = query
        ? `${SEARCH_URL}?query=${encodeURIComponent(query)}`
        : `${DISCOVER_URL}?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()
      setMovieList(data.results || [])
      updateSearchCount()

    } catch (error) {
      console.error(error)
      setErrorMessage('Error fetching movies. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm)
  }, [debounceSearchTerm])

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1 className="text-white">
            Find <span className="text-gradient">Movies</span> You'll Enjoy without Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-24 text-white text-2xl font-semibold">
            All Movies
          </h2>

          {isLoading && <Spinner />}

          {errorMessage && (
            <p className="text-red-500 mt-4">{errorMessage}</p>
          )}

          {!isLoading && !errorMessage && (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
