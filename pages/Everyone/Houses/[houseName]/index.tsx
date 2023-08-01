import {
  Button,
  IconButton,
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
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import styles from "./HousePage.module.css";
import Layout from "../../../Layout";
import { useRouter } from "next/router";
import SearchBar from "@/components/SearchBar";
import { useEffect, useRef, useState } from "react";
import { fetcher } from "@/lib/functions";
import { HouseCol, MySession, ReceivedUserDataOnClient } from "@/lib/types";
import useSWR from "swr";
import Pagination from "@/components/Pagination";
import UserList from "@/components/UserList";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";

// function to search users
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

// function for getting the house data
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

// function to increase or decrease points
async function changePoints(
  mode: "Increase" | "Decrease",
  id: string,
  toast: any,
  mutateHouse: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsLoading(true);

  const res = await fetch(`/api/house/${id}/${mode.toLowerCase()}`, {
    method: "POST",
  });
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
  setIsLoading(false);
}

// function to edit points
async function editPoints(
  points: number,
  id: string,
  toast: any,
  mutateHouse: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsLoading(true);
  const res = await fetch(`/api/house/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ points: points }),
  });
  if (res.ok) {
    toast({
      title: `Points edited`,
      description: `Points edited to ${points}`,
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
  setIsLoading(false);
}

// component of the Houseplate on the top of the page
function HousePlate({
  house,
  mutateHouse,
}: {
  house: HouseCol;
  mutateHouse: any;
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditPlateOpen, setIsEditPlateOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isAdmin = (useSession().data as MySession)?.user.role === "Admin";

  useEffect(() => {
    if (isFocused || isHovered) {
      setIsEditPlateOpen(true);
    } else {
      setIsEditPlateOpen(false);
    }
  }, [isFocused, isHovered]);

  const [isLoadingPlus, setIsLoadingPlus] = useState(false);
  const [isLoadingMinus, setIsLoadingMinus] = useState(false);

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
          <span className={styles.houseName}>{house.name} </span>
          <span className={styles.housePoints}>{house.points} points </span>
        </div>
      </div>
      {isAdmin && (
        <>
          <EditPointsModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            house={house}
            mutateHouse={mutateHouse}
          />

          <div
            className={styles.endBtn}
            tabIndex={2}
            onMouseLeave={() => setIsHovered(false)}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            onMouseEnter={() => setIsHovered(true)}
          >
            {isEditPlateOpen && (
              <span className={styles.editHouseButtons}>
                {/* increasing points */}
                <Button
                  onClick={() => {
                    !isLoadingPlus &&
                      changePoints(
                        "Increase",
                        house._id.toString(),
                        toast,
                        mutateHouse,
                        setIsLoadingPlus
                      );
                  }}
                >
                  {isLoadingPlus ? <Spinner size={"sm"} /> : <AddIcon />}
                </Button>

                <Button onClick={onOpen}>Edit</Button>

                {/* decreasing points */}
                <Button
                  onClick={() => {
                    !isLoadingMinus &&
                      changePoints(
                        "Decrease",
                        house._id.toString(),
                        toast,
                        mutateHouse,
                        setIsLoadingMinus
                      );
                  }}
                >
                  {isLoadingMinus ? <Spinner size={"sm"} /> : <MinusIcon />}
                </Button>
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// component for the editPointsModal
function EditPointsModal({
  isOpen,
  onOpen,
  onClose,
  house,
  mutateHouse,
}: {
  isOpen: any;
  onOpen: any;
  onClose: any;
  house: HouseCol;
  mutateHouse: any;
}) {
  const toast = useToast();

  // useState to store the points situation
  const [points, setPoints] = useState(house.points);
  useEffect(() => {
    setPoints(house.points);
  }, [house.points]);

  // for loading animation
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent bg="hsl(var(--b2))">
        <ModalHeader>Edit Points</ModalHeader>
        <ModalBody>
          <NumberInput
            allowMouseWheel
            defaultValue={points}
            // max={10} sets the upper limit for the value in the input
            // keepWithinRange={false}
            // clampValueOnBlur={false}
            value={points}
            onChange={(e) => {
              setPoints(parseInt(e));
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper onClick={() => setPoints((p) => p + 1)} />
              <NumberDecrementStepper onClick={() => setPoints((p) => p - 1)} />
            </NumberInputStepper>
          </NumberInput>
        </ModalBody>
        <ModalFooter className={styles.modalFooter}>
          <Button className="modalNoBtn" onClick={onClose}>
            Close
          </Button>
          <Button
            isLoading={isLoading}
            className="modalYesBtn"
            onClick={async () => {
              await editPoints(
                points,
                house._id.toString(),
                toast,
                mutateHouse,
                setIsLoading
              );
              onClose();
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Entire page setup
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
            setPage={setPage}
          />
          <UserList
            isLoading={isLoading}
            error={error}
            usersData={users}
            mutate={mutate}
          />
          <div className={styles.botBar}>
            <Pagination page={page} setPage={setPage} items={users} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HousePage;
