// maps to root `/` URL
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetLocationsByPageQuery } from "@/lib/redux/services/locationApi";
import Pagination from "@/components/Pagination";
import LocationCard from "@/components/LocationCard";
import "./home.scss";

export default function Page() {
  const [page, setPage] = useState(1);
  const {
    data = { results: [], info: { count: 0, pages: 0 } },
    isLoading = false,
    isError,
  } = useGetLocationsByPageQuery(page);

  const router = useRouter();

  useEffect(() => {
    router.replace(`?page=${page}`);
  }, [page]);

  if (isError) {
    return <div>Error</div>;
  }

  const loadingCardArray = Array.from({ length: 4 }, (_, index) => index + 1);

  return (
    <main>
      <div className="container">
        <div className="wrapper">
          {!isLoading &&
            data?.results.map((location) => (
              <LocationCard
                key={location.id}
                id={location.id}
                name={location.name}
                type={location.type}
                dimension={location.dimension}
                resident_count={location.residents?.length}
                loading={isLoading}
              />
            ))}
          {isLoading &&
            loadingCardArray.map((item) => (
              <LocationCard
                key={item}
                id={item}
                name="loading"
                type="loading"
                dimension="loading"
                resident_count={0}
                loading={isLoading}
              />
            ))}
          <Pagination
            totalDataCount={data?.info?.count}
            totalPageCount={data?.info?.pages}
            currentPage={page}
            onPageChange={(currPage) => setPage(currPage)}
          />
        </div>
      </div>
    </main>
  );
}
