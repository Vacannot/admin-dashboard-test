import { createContext, useContext } from "react";

interface SelectedUserContextType {
  selectedUserId: string | null;
  setSelectedUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultContextValue: SelectedUserContextType = {
  selectedUserId: null,
  setSelectedUserId: () => {}, // Initial setter function does nothing
};

export const SelectedUserContext =
  createContext<SelectedUserContextType>(defaultContextValue);

export function useSelectedUser() {
  return useContext(SelectedUserContext);
}
