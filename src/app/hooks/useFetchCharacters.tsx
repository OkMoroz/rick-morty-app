"use client";
import { useState, useEffect } from "react";

interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
}

interface ApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}

const useFetchCharacters = (page: number) => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://rickandmortyapi.com/api/character?page=${page}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: ApiResponse = await response.json();
                setData(result);
            } catch (err) {
                setError("Failed to fetch characters. Please try again later.");
                console.error("Error fetching characters:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page]);

    return { data, isLoading, error };
};

export default useFetchCharacters;
