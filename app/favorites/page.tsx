"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import CharacterCard from "@/components/CharacterCard";
import { toggleFavorite } from "@/lib/redux/features/favoriteSlice";

function Favorites() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  return (
    <div className="container">
      <div className="wrapper">
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
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
