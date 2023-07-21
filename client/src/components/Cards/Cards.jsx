import Card from "../Card/Card";
import "./Cards.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

const Cards = ({ currentPage, setCurrentPage, countPage, setCountPage, isLoading, isActive }) => {
  const { pokemons } = useSelector(state => state)

	const filteredPokemons = () => {
		return pokemons.slice(currentPage, currentPage + 12);
	}

	const nextPage = () => {
		if(pokemons.length > currentPage + 12){
      setCurrentPage(currentPage + 12);
      setCountPage(countPage + 1);
    }
	}

	const prevPage = () => {
		if(currentPage > 0){
			setCurrentPage(currentPage - 12);
      setCountPage(countPage - 1)
		}
	}
  
	return (
		<>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={`Cards ${isActive ? "active" : ""}`}>
          {!pokemons.length ? (
            <h1>No hay resultados</h1>
          ) : (
            filteredPokemons().map((pokemon, index) => (
              <Card key={index} pokemon={pokemon} />
            ))
          )}
          <div className="Pagination">
            <button onClick={prevPage} className="btnPrevious" type="text">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M15 6l-6 6l6 6" />
              </svg>
            </button>
            <span className="dark:text-black">{countPage}</span>
            <button onClick={nextPage} className="btnNext" type="text">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 6l6 6l-6 6" />
              </svg>
            </button>
          </div>
        </div>
        </>
      )}
    </>
	)
}

export default Cards