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
  //Puxa todos os pokemons da API usando SSR para usar no Search
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1292");
  const allPokemonsRaw = await response.json();
  const allPokemons = [];

  //Transforma o slug do pokemon em nome e junta com o ID para facilitar a busca
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
