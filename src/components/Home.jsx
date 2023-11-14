import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import styles from "./Home.module.css";
import Search from "./Search";
import { CardLoading } from "./CardLoading";

const Home = ({ allPokemons }) => {
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Loads Pokemon according to the search performed in the Search component
   * Makes 2 calls: One pulls the pokemon information and the other, the flavor text
   */
  useEffect(() => {
    if (searchedPokemon != "") {
      setIsLoading(true);
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon.name}`)
        .then((responsePokemon) => {
          setPokemonData({
            ...responsePokemon.data,
          });

          axios
            .get(
              `https://pokeapi.co/api/v2/pokemon-species/${searchedPokemon.id}`
            )
            .then((responseDescription) => {
              const entries = responseDescription.data.flavor_text_entries;
              const description =
                //If the flavor text doesn't exist, returns not found text
                entries.length >= 9
                  ? entries[9].flavor_text
                  : "No description was found for this pokemon.";
              const escDescription = description.split("\n").join(" ");
              setPokemonData((prev) => ({
                ...prev,
                description: escDescription,
              }));
            })
            .catch((error) => {
              //If the flavor text doesn't exist, returns not found text
              const description = "No description was found for this pokemon.";
              setPokemonData((prev) => ({
                ...prev,
                description: description,
              }));
            });

          setIsLoading(false);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [searchedPokemon]);

  //If it's loading, renders a blank card
  if (isLoading)
    return (
      <section className={styles.container}>
        <Search
          setSearchedPokemon={setSearchedPokemon}
          allPokemons={allPokemons}
        />
        <div>
          <CardLoading />
        </div>
      </section>
    );

  //If no pokemon has been researched yet, it shows instructions on how to search
  if (pokemonData == "")
    return (
      <section className={styles.container}>
        <Search
          setSearchedPokemon={setSearchedPokemon}
          allPokemons={allPokemons}
        />
        <div className={styles.welcome}>
          <h4>Welcome to Pokedex Remastered!</h4>
          <p>To get started, search for a pokemon in the search bar above.</p>
          <p>
            To make your search easier, this app has a search system with
            autocomplete. So when the pokemon you want appears, just click on
            its name, then click Search and its done!
          </p>
        </div>
      </section>
    );

  //Shows information about the chosen pokemon
  return (
    <section className={styles.container}>
      <Search
        setSearchedPokemon={setSearchedPokemon}
        allPokemons={allPokemons}
      />
      <Card pokemonData={pokemonData} />
    </section>
  );
};

export default Home;
