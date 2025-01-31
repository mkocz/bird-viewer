import { create } from "zustand";
import Bird from "./entities/Bird";


export interface BirdQuery {
  family?: string | undefined;
  order?: string | undefined;
  region?: string | undefined;
  searchResults?: Bird[] ;
}

interface BirdQueryStore {
  birdQuery: BirdQuery;
  searchText?: string;
  setSearchText: (searchText: string) => void;
  setFamily: (family: string  | undefined) => void;
  setOrder: (order: string  | undefined) => void;
  setRegion: (region: string | undefined) => void;
  setSearchResults: (searchResults: Bird[]) => void;
}

const useBirdQueryStore = create<BirdQueryStore>((set) => ({
  birdQuery: {},
  setSearchText: (searchText) => set(() => ({ searchText: searchText })),
  setSearchResults: (searchResults) =>
    set((store) => ({ birdQuery: { ...store.birdQuery, searchResults } })),
  setFamily: (family) =>
    set((store) => ({ birdQuery: { ...store.birdQuery, family } })),
  setOrder: (order) =>
    set((store) => ({ birdQuery: { ...store.birdQuery, order } })),
  setRegion: (region) =>
    set((store) => ({ birdQuery: { ...store.birdQuery, region } })),
}));

export default useBirdQueryStore;
