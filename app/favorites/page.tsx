"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toggleFavorite } from "@/lib/redux/features/favoriteSlice";
import styles from "./favorites.module.scss";
import CharacterCard from "@/components/CharacterCard";

function Favorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  return (
    <div className="container">
      <div className={styles.wrapper}>
        {favorites.map((data) => (
          <CharacterCard
            key={data.id}
            id={data.id}
            name={data.name}
            species={data.species}
            status={data.status}
            image={data.image}
            type={data.type}
            gender={data.gender}
            origin={data.origin.name}
            onToggle={() => dispatch(toggleFavorite(data))}
            dataType="detail"
            gridSystem={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
