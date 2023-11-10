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

  //Carrega o Pokemon de acordo com a busca realizada no componente Search
  //Realiza 2 chamadas: Uma puxa as infos do pokemon e a outra, o flavor text
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
                //Caso não tenha o flavor text escolhido, retorna texto de não encontrado
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
              //Caso não tenha flavor text pra esse id, retorna texto de não encontrado
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

  //Caso esteja carregando, renderiza um Card em branco
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

  //Caso nenhum pokemon tenha sido pesquisado ainda, mostra as instruções de como pesquisar
  if (pokemonData == "")
    return (
      <section className={styles.container}>
        <Search
          setSearchedPokemon={setSearchedPokemon}
          allPokemons={allPokemons}
        />
        <div className={styles.welcome}>
          <h4>Seja bem vindo à Pokedex Remastered!</h4>
          <p>
            Para começar, pesquise por um pokemon na barra de pesquisa acima.
          </p>
          <p>
            Para facilitar sua busca, esse aplicativo conta com um sistema de
            complemento automático. Ou seja, quando aparecer o pokemon que você
            está procurando, basta clicar no pokemon desejado, depois em Buscar
            e pronto!
          </p>
        </div>
      </section>
    );

  //Mostra as informações do pokemon escolhido
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
