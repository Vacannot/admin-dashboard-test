import { createContext, useContext } from "react";

interface SearchTermContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchTermContext = createContext<SearchTermContextType>({
  searchTerm: "",
  setSearchTerm: () => {},
});

export const useSearchTerm = () => useContext(SearchTermContext);
