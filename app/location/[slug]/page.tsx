"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import styles from "./location.module.scss";
import { useGetCharactersByLocationQuery } from "@/lib/redux/services/locationApi";
import CharacterCard from "@/components/CharacterCard";
import Pagination from "@/components/Pagination";
import FilterButton from "@/components/FilterButton";

type PageParams = {
  slug: string;
};

type PageProps = {
  params: PageParams;
};

type Status = "all" | "alive" | "dead" | "unknown";

export default function Page({ params }: PageProps) {
  const id = params.slug.split("-").slice(-1)[0];
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string>("all");
  const {
    data = { results: [], info: { pages: 0, count: 0 } },
    isError,
    isLoading,
  } = useGetCharactersByLocationQuery({
    id: Number(id),
    status: filter,
    page,
  });

  const router = useRouter();

  useEffect(() => {
    router.replace(
      filter === "all" ? `?page=${page}` : `?status=${filter}&page=${page}`
    );
  }, [page]);

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleFilter = (status: string) => {
    setFilter(filter === status ? "all" : status);
    router.replace(
      filter !== status ? `?status=${status}&page=${page}` : `?page=${page}`
    );
    setPage(1);
  };

  return (
    <div className="container">
      <div className={styles.header}>
        <p>Filter by status</p>
        <p>My Favorites</p>
      </div>
      <div className={styles.btn_container}>
        {["alive", "dead", "unknown"].map((status) => (
          <FilterButton
            key={status}
            status={status}
            handleFilter={() => handleFilter(status)}
            isActive={filter === status}
          />
        ))}
      </div>
      <div
        className={classNames(styles.wrapper, {
          "justify-start": data.info.count < 3,
        })}
      >
        {data?.results.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            image={character.image}
            status={character.status}
            species={character.species}
            type="list"
          />
        ))}
      </div>
      <Pagination
        totalPageCount={data?.info.count}
        currentPage={page}
        onPageChange={(currPage) => setPage(currPage)}
      />
    </div>
  );
}
