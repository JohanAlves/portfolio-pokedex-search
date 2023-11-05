import { useEffect, useState } from "react";
import styles from "./Card.module.css";

export const Card = ({ pokemonData }) => {
  const [elementalType, setElementalType] = useState({
    class: styles.fire,
    img: "/img/type.png",
  });

  useEffect(() => {
    const elements = ["fire", "water", "grass", "electric"];
    const pokemonElements = pokemonData.types.find((type) =>
      elements.includes(type.type.name)
    );
    if (pokemonElements !== undefined) {
      switch (pokemonData.types[0].type.name) {
        case "fire":
          setElementalType({ class: styles.fire, img: "/img/fire.png" });
          break;
        case "water":
          setElementalType({ class: styles.water, img: "/img/water.png" });
          break;
        case "grass":
          setElementalType({ class: styles.grass, img: "/img/grass.png" });
          break;
        case "electric":
          setElementalType({
            class: styles.electric,
            img: "/img/eletric.png",
          });
          break;
        default:
          setElementalType({
            class: styles.colorless,
            img: "/img/colorless.png",
          });
          break;
      }
    } else {
      setElementalType({ class: styles.colorless, img: "/img/colorless.png" });
    }
  }, [pokemonData]);

  const capitalizedName =
    pokemonData?.name.charAt(0).toUpperCase() + pokemonData?.name.slice(1);
  const readableName = capitalizedName.split("-").join(" ");

  return (
    <div className={`${styles.pokemon_card} ${elementalType.class}`}>
      <div className={styles.card_top}>
        <h1 className={styles.card_title}>
          {pokemonData?.id} - {pokemonData.name}
        </h1>
        <div className={styles.card_type}>
          <img src={elementalType.img} alt="" />
        </div>
      </div>
      <div className={styles.pokemon_image}>
        <img
          src={pokemonData?.sprites.other["official-artwork"].front_default}
          alt=""
        />
      </div>
      <div className={styles.card_details}>
        <div className={styles.stats}>
          <span>ATK</span>
          <h6>{pokemonData?.stats[1].base_stat}</h6>
        </div>
        <div className={styles.stats}>
          <span>DEF</span>
          <h6>{pokemonData?.stats[2].base_stat}</h6>
        </div>
        <div className={styles.stats}>
          <span>VIT</span>
          <h6>{pokemonData?.stats[0].base_stat}</h6>
        </div>
      </div>
      <p className={styles.card_description}>{pokemonData?.description}</p>
    </div>
  );
};
