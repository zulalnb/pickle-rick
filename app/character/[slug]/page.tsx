"use client";
import {
  useGetCharacterDetailQuery,
  useGetCharactersByLocationQuery,
} from "@/lib/redux/services/locationApi";
import styles from "./character.module.scss";
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
  const { data } = useGetCharacterDetailQuery(Number(id));
  const { data: otherData } = useGetCharactersByLocationQuery({
    id: Number(data?.location.url.split("/").slice(-1)),
    status: data?.status,
    all: { character: data?.id },
  });

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
            dataType="detail"
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
