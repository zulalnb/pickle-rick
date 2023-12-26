"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import { useGetCharactersByLocationQuery } from "@/lib/redux/services/locationApi";
import styles from "./location.module.scss";
import { toggleFavorite } from "@/lib/redux/features/favoriteSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
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
  const { data, isError, isLoading } = useGetCharactersByLocationQuery({
    id: Number(id),
    status: filter,
    page,
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    router.replace(
      filter === "all" ? `?page=${page}` : `?status=${filter}&page=${page}`
    );
  }, [page]);

  if (isError) {
    return <div>error</div>;
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
        <Link href="/favorites" replace color="black">
          My Favorites
        </Link>
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
      <div className={classNames(styles.wrapper)}>
        {data?.results.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            image={character.image}
            status={character.status}
            species={character.species}
            dataType="list"
            onToggle={() => dispatch(toggleFavorite(character))}
            loading={isLoading}
          />
        ))}
        {isLoading &&
          [1, 2, 3].map((item) => (
            <CharacterCard
              key={item}
              id={1}
              name="lorem"
              image="loading"
              status="unknown"
              species="lorem"
              dataType="list"
              loading={isLoading}
            />
          ))}
      </div>
      <Pagination
        totalDataCount={data?.info?.count}
        totalPageCount={data?.info?.pages}
        currentPage={page}
        onPageChange={(currPage) => setPage(currPage)}
      />
    </div>
  );
}
