import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemonStore } from "./redux/actions";

// Pages
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import FormCreate from "./pages/FormCreate/FormCreate";

// Components
import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

const App = () => {
  const { pokemons } = useSelector(state => state);
  const [allPokemons, setAllPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const getAllPokemons = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios(URL);
      setAllPokemons(data);
      dispatch(getAllPokemonStore(data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypes = async () => {
    try {
      const { data } = await axios("/types");
      setTypes(data);
    } catch (error) {
      console.error(error)
    }
  }

  const onSearch = async name => {
    try {
      const { data } = await axios(`/pokemons/name?name=${name}`);
      const namePokemon = data.map(pokemon => pokemon.name);
      const filteredPokemons = pokemons.filter(pokemon => namePokemon.includes(pokemon.name));
      dispatch(getAllPokemonStore(filteredPokemons));
    } catch (error) {
      alert("You must search by the exact pokemon name");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPokemons();
    getTypes();
  }, []);
  
  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar allPokemons={allPokemons} onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home types={types} isLoading={isLoading} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<FormCreate allPokemons={allPokemons} types={types} />} />
        <Route path="*" element={<PageNotFound /> } />
      </Routes>
      {/* {location.pathname !== "/" && <Footer />} */}
    </div>
  )
}

export default App
