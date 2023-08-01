import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import styles from "./SearchBar.module.css";

import { fetcher } from "@/lib/functions";
import useSWR from "swr";
import {
  ReceivedUserDataOnClient,
  Role,
  SentUserDataFromClient,
} from "@/lib/types";
import { Search2Icon } from "@chakra-ui/icons";

function useSearch(searchQuery: string, role: string, page: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/allUsers/search?searchQuery=${searchQuery}&page=${page}&role=${role}`,
    fetcher
  );

  return {
    users: data as ReceivedUserDataOnClient[],
    isLoading,
    error: error,
    mutate,
  };
}

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  setPage,
}: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <FormControl id="search">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </InputGroup>
      </FormControl>
    </div>
  );
}
