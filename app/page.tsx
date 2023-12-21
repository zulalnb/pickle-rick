// maps to root `/` URL
"use client";
import { useEffect, useState } from "react";
import { useGetLocationsByPageQuery } from "@/lib/redux/services/locationApi";
import Pagination from "@/components/Pagination";
import LocationCard from "@/components/LocationCard";
import "./home.scss";
import { useRouter } from "next/navigation";

export default function Page() {
  const [page, setPage] = useState(1);
  const { data, isLoading = false, isError } = useGetLocationsByPageQuery(page);

  const router = useRouter();

  useEffect(() => {
    router.replace(`?page=${page}`);
  }, [page]);

  if (isError) {
    return <div>Error</div>;
  }

  const loadingCardArray = Array.from({ length: 4 }, (_, index) => index + 1);

  return (
    <div className="container">
      <div className="wrapper gap-10">
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
          totalPageCount={data?.info.pages}
          currentPage={page}
          onPageChange={(currPage) => setPage(currPage)}
        />
      </div>
    </div>
  );
}
