"use client";
import React, { useEffect, useState } from "react";

interface Episode {
  id: number;
  name: string;
  episode: string;
}

interface CharacterDetail {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  image: string;
  episodes: Episode[];
}

const CharacterDetailPage = ({ params }: { params: { id: string } }) => {
  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${params.id}`,
      );
      const data = await res.json();
      setCharacter(data);
      setIsLoading(false);
    };

    fetchCharacter();
  }, [params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{character?.name}</h1>
      <img src={character?.image} alt={character?.name} />
      <p>Status: {character?.status}</p>
      <p>Species: {character?.species}</p>
      <p>Gender: {character?.gender}</p>
      <p>Origin: {character?.origin}</p>
      <h2>Episodes</h2>
      <ul>
        {character?.episodes.map((episode) => (
          <li key={episode.id}>
            {episode.name} ({episode.episode})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetailPage;
