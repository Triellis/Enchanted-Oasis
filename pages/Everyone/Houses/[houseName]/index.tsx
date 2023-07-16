import { Button, Image } from "@chakra-ui/react";
import styles from "./HousePage.module.css";
import Layout from "../../../Layout";
import { useRouter } from "next/router";
import SearchBar from "@/components/SearchBar";
import { useEffect, useRef, useState } from "react";
import { fetcher } from "@/lib/functions";
import { HouseCol, ReceivedUserDataOnClient } from "@/lib/types";
import useSWR from "swr";
import Pagination from "@/components/Pagination";
import UserList from "@/components/UserList";

function useSearch(searchQuery: string, page: number, id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/house/${id}/searchMembers?searchQuery=${searchQuery}&page=${page}`,
    fetcher
  );
  return {
    users: data as ReceivedUserDataOnClient[],
    isLoading,
    error: error,
    mutate,
  };
}

function useHouse(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/house/${id}`,
    fetcher
  );
  return {
    house: data,
    isHouseLoading: isLoading,
    houseLoadingError: error,
    mutateHouse: mutate,
  };
}

function HousePlate({ house }: { house: HouseCol }) {
  return (
    <div className={styles.housePlate}>
      <span
        className={styles.houseImage}
        style={{
          backgroundImage: `url(/assets/image/Houses/${house.name[0]}.png)`,
        }}
      ></span>
      <div className={styles.scoreBoard}>
        <div className={styles.boardContent}>
          <span className={styles.houseName}>{house.name}</span>
          <span className={styles.housePoints}>{house.points}</span>
        </div>
        <span className={styles.editHouseButtons}>
          <Button>+</Button>
          <Button>-</Button>
          <Button>Edit</Button>
        </span>
      </div>
    </div>
  );
}
function HousePage() {
  // getting the house from the url or previous page
  const router = useRouter();
  const { houseName, houseId } = router.query;

  let banner = "";
  if (houseName === "Gryffindor") {
    banner = "Gb";
  } else if (houseName === "Ravenclaw") {
    banner = "Rb";
  } else if (houseName === "Hufflepuff") {
    banner = "Hb";
  } else if (houseName === "Slytherin") {
    banner = "Sb";
  }

  const [searchQuery, setSearchQuery] = useState("");
  const { house, isHouseLoading, houseLoadingError, mutateHouse } = useHouse(
    houseId as string
  );

  const [page, setPage] = useState(1);

  const { users, isLoading, error, mutate } = useSearch(
    searchQuery,
    page,
    houseId as string
  );

  return (
    <Layout>
      <div className={styles.main}>
        {/* Banner in the start */}
        <div className={styles.banner}>
          <Image src={`/assets/image/Banners/${banner}.png`} alt="Gryffindor" />
        </div>

        {/* Remaining contnet beside it */}
        <div className={styles.wrapper}>
          {!isHouseLoading && <HousePlate house={house} />}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <UserList
            isLoading={isLoading}
            error={error}
            usersData={users}
            mutate={mutate}
          />
          <div className={styles.botBar}>
            <Pagination page={page} setPage={setPage} users={users} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HousePage;
