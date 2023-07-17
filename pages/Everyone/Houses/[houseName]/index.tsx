import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
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

async function changePoints(
  mode: "Increase" | "Decrease",
  id: string,
  toast: any,
  mutateHouse: any
) {
  const res = await fetch(
    `http://localhost:3000/api/house/${id}/${mode.toLowerCase()}`,
    {
      method: "POST",
    }
  );
  if (res.ok) {
    toast({
      title: `Points ${mode}d`,
      description: `Points ${mode}d by 1`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    mutateHouse();
  } else {
    toast({
      title: "Error",
      description: await res.text(),
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

function HousePlate({
  house,
  mutateHouse,
}: {
  house: HouseCol;
  mutateHouse: any;
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <span className={styles.houseName}>{house.name} - </span>
          <span className={styles.housePoints}>{house.points} points </span>
        </div>
        <span className={styles.editHouseButtons}>
          <Button
            onClick={() =>
              changePoints("Increase", house._id.toString(), toast, mutateHouse)
            }
          >
            +
          </Button>
          <Button
            onClick={() =>
              changePoints("Decrease", house._id.toString(), toast, mutateHouse)
            }
          >
            -
          </Button>
          <Button onClick={onOpen}>Edit</Button>
        </span>
      </div>

      <TransitionExample isOpen={isOpen} onOpen={onOpen} onClose={onClose} house={house} mutateHouse={mutateHouse}  />
    </div>
  );
}

function TransitionExample({
  isOpen,
  onOpen,
  onClose,
  house,
  mutateHouse
}: {
  isOpen: any;
  onOpen: any;
  onClose: any;
  house: HouseCol;
  mutateHouse: any;
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent bg="hsl(var(--b2))">
        <ModalHeader>Edit Points</ModalHeader>
        <ModalBody>
          <NumberInput
            defaultValue={house.points}
            // max={10} sets the upper limit for the value in the input
            // keepWithinRange={false}
            // clampValueOnBlur={false}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </ModalBody>
        <ModalFooter className={styles.modalFooter}>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button bg="hsl(var(--s))">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
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
          {!isHouseLoading && (
            <HousePlate mutateHouse={mutateHouse} house={house} />
          )}
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