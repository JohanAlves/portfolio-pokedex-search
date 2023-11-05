import { useState } from "react";
import styles from "./Search.module.css";

const Search = ({ allPokemons, setSearchedPokemon }) => {
  const [showResults, setShowResults] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(-1);
  const [error, setError] = useState("");

  function handleSearchResults(value) {
    if (value.trim()) {
      const filteredPokemons = allPokemons.filter(
        (pokemon) =>
          pokemon.label.toUpperCase().includes(value.toUpperCase()) > 0
      );
      setResults(filteredPokemons.slice(0, 10));
    } else {
      setResults("");
    }
    setInput(value);
    handleShowResults(value);
  }

  function handleShowResults(value) {
    value == "" ? setShowResults(false) : setShowResults(true);
  }

  function handleSearchResultsClick(e) {
    setInput(e.target.innerText);
  }

  function handleSearchResultsKeyDown(e) {
    if (showResults) {
      const maxIndex = results.length - 1;

      if (e.key === "ArrowUp") {
        setSelectedResult(
          selectedResult === -1 ? maxIndex : selectedResult - 1
        );
      } else if (e.key === "ArrowDown") {
        setSelectedResult(
          maxIndex === selectedResult ? -1 : selectedResult + 1
        );
      } else if (e.key === "Enter" && selectedResult >= 0) {
        const choosenResult = results[selectedResult].label;
        setInput(choosenResult);
        setShowResults(false);
      }
    }
  }

  function handleResultHover(index) {
    setSelectedResult(index);
  }

  function handleResultLeave() {
    setSelectedResult(-1);
  }

  function validateChoosePokemon(input) {
    const chosenObj = allPokemons.find((pokemon) => pokemon.label === input);
    if (chosenObj !== undefined) {
      setSearchedPokemon(chosenObj);
      setError("");
      setInput("");
    } else setError("Escolha uma opção válida!");
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.search_bar}>
        <input
          type="text"
          placeholder="ID ou Nome"
          value={input}
          onChange={(e) => handleSearchResults(e.target.value)}
          onFocus={() => handleSearchResults(input)}
          onBlur={() => setShowResults(false)}
          onKeyDown={(e) => handleSearchResultsKeyDown(e)}
        />
        <button onClick={() => validateChoosePokemon(input)}>Buscar</button>

        {showResults && results.length && (
          <ul className={styles.results}>
            {results?.map((result, index) => (
              <li
                key={index}
                onMouseDown={handleSearchResultsClick}
                className={
                  index === selectedResult
                    ? styles.selectedResult
                    : styles.result
                }
                onMouseEnter={() => handleResultHover(index)}
                onMouseLeave={handleResultLeave}
              >
                {result.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className={styles.searchError}> {error}</span>
    </header>
  );
};

export default Search;
