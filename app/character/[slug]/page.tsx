"use client";
import {
  useGetCharacterDetailQuery,
  useGetCharactersByLocationQuery,
} from "@/lib/redux/services/locationApi";
import styles from "./character.module.scss";
import { useAppDispatch } from "@/lib/redux/hooks";
import { toggleFavorite } from "@/lib/redux/features/favoriteSlice";
import CharacterCard from "@/components/CharacterCard";
import OtherCharacterCard from "@/components/OtherCharacterCard";

type PageParams = {
  slug: string;
};

type PageProps = {
  params: PageParams;
};

function Page({ params }: PageProps) {
  const id = params.slug.split("-").slice(-1)[0];
  const { data, isLoading } = useGetCharacterDetailQuery(Number(id));
  const { data: otherData, isLoading: isLoadingOther } =
    useGetCharactersByLocationQuery({
      id: Number(data?.location.url.split("/").slice(-1)),
      status: data?.status,
      all: { character: data?.id },
    });
  const dispatch = useAppDispatch();

  return (
    <div className="container">
      <div className={styles.wrapper}>
        {data && (
          <CharacterCard
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
            loading={isLoading}
          />
        )}
        {isLoading && (
          <CharacterCard
            id={0}
            name="loading"
            species="loading"
            status="Alive"
            image="loading"
            type="loading"
            gender="loading"
            origin="loading"
            dataType="detail"
            loading={isLoading}
          />
        )}
        <div>
          <h2>Other Characters</h2>
          {otherData?.results.map((character) => (
            <OtherCharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              type={character.type}
              gender={character.gender}
              origin={character.origin.name}
              image={character.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
