"use client";
import React, { useState } from "react";
import useFetchCharacters from "../hooks/useFetchCharacters";

const CharactersPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetchCharacters(page);

  if (isLoading) {
    return <div>Loading characters ...</div>;
  }

  if (error) {
    return (
        <div>
          <p>{error}</p>
          <button onClick={() => setPage(page)}>Retry</button>
        </div>
    );
  }

  return (
      <div>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-center text-white uppercase tracking-wide drop-shadow-md">
              Rick and Morty Characters</h1>

          <div>
              {data?.results.map((character) => (
                  <div key={character.id}>
                      <img src={character.image} alt={character.name} />
                <div>
                  <h2>{character.name}</h2>
                  <p>{character.species} • {character.status}</p>
                </div>
              </div>
          ))}
        </div>

        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
          Page {page} of {data?.info.pages}
        </span>
          <button onClick={() => setPage(page + 1)} disabled={page === data?.info.pages}>
            Next
          </button>
        </div>
      </div>
  );
};

export default CharactersPage;
