import Head from "next/head";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
import Home from "@/components/Home";

export default function App({ allPokemons }) {
  return (
    <>
      <Head>
        <title>Pokedex Remastered</title>
        <meta name="description" content="Pokedex created by Johan Alves" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={montserrat.className}>
        <Home allPokemons={allPokemons} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  //Pulls all pokemons from the API using SSR to use in Search
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1292");
  const allPokemonsRaw = await response.json();
  const allPokemons = [];

  //Transforms the pokemon's slug into a name and combines it with the ID to make the search easier
  allPokemonsRaw.results.map((pok) => {
    const splitUrl = pok.url.split("/");
    const id = splitUrl[splitUrl.length - 2];
    const capitalizedName =
      pok.name.charAt(0).toUpperCase() + pok.name.slice(1);
    const readableName = capitalizedName.split("-").join(" ");
    const label = id + " - " + readableName;

    allPokemons.push({
      id: id,
      name: pok.name,
      label: label,
    });
  });

  return {
    props: {
      allPokemons: allPokemons,
    },
  };
}
