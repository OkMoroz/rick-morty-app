"use client";
import React from "react";
import useFetchCharacters from "../hooks/useFetchCharacters";

export default function ClientComponent() {
  const { data, isLoading, error } = useFetchCharacters(1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
      <div className="p-8">
          <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-center text-white uppercase tracking-wide drop-shadow-md mt-4 mb-8">

              Characters from Rick and Morty</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-7xl">
                  {data.results.map((character) => (
                      <div key={character.id}
                           className="bg-gray-800 text-white p-4 border-2 border-gray-300 rounded-md shadow-md flex flex-col items-center justify-center"
                      >
                          <img src={character.image} alt={character.name}
                               className="w-full h-48 object-cover rounded-md"
                          />
                          <p className="text-center mt-2">{character.name}</p>
                      </div>
                  ))}
              </div>

      </div>
);
}
