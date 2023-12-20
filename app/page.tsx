// maps to root `/` URL
"use client";
import { useState } from "react";
import { useGetLocationsByPageQuery } from "@/lib/redux/services/locationApi";
import Pagination from "@/components/Pagination";
import LocationCard from "@/components/LocationCard";
import "./home.scss";

export default function Page() {
  const [page, setPage] = useState(1);
  let { data, isLoading, isError } = useGetLocationsByPageQuery(page);

  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="container">
      <div className="wrapper">
        {data?.results.map((location) => (
          <LocationCard
            key={location.id}
            name={location.name}
            type={location.type}
            dimension={location.dimension}
            resident_count={location.residents.length}
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
