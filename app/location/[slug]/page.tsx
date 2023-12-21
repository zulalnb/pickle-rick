"use client";
import { useGetCharactersByLocationQuery } from "@/lib/redux/services/locationApi";
import CharacterCard from "@/components/CharacterCard";
import styles from "./location.module.scss";
import Pagination from "@/components/Pagination";
import { useState } from "react";

type PageParams = {
  slug: number;
};

type PageProps = {
  params: PageParams;
};

export default function Page({ params }: PageProps) {
  const [page, setPage] = useState(1);
  const { data, isError } = useGetCharactersByLocationQuery({
    id: params.slug,
    page,
  });

  if (isError) {
    return <div>error</div>;
  }

/*   if (isLoading) {
    return <div>Loading...</div>;
  } */

  return (
    <div className="container">
      <div className={styles.wrapper}>
        {data?.results.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            image={character.image}
            status={character.status}
            species={character.species}
          />
        ))}
      </div>
      <Pagination
        totalPageCount={data?.info.pages}
        currentPage={page}
        onPageChange={(currPage) => setPage(currPage)}
      />
    </div>
  );
}
