import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface CharactersState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk<Character[]>(
  "characters/fetchCharacters",
  async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data.results;
  },
);

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch characters";
      });
  },
});

export const { setCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;
