"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
  }, [searchParams]);

  const debounceTimeout = React.useRef(null);
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      router.replace(`?${params.toString()}`);
    }, 500);
  };

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        name="search"
        id="search"
        className="w-96 h-10 rounded-lg ps-2 text-center"
        placeholder="Search by name, mobile, ID, or email..."
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}
