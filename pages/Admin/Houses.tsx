import Layout from "../Layout";
import styles from "./Houses.module.css";
import { Card, CardBody, Grid, GridItem, Link } from "@chakra-ui/react";
import Image from "next/image";
import { fetcher } from "@/lib/functions";
import useSWR from "swr";
import { HouseCol } from "@/lib/types";

function useLeaderboard() {
  const { data, error, isLoading } = useSWR(`/api/house/list`, fetcher);

  return {
    houses: data as HouseCol[],
    isLoading,
    isError: error,
  };
}

function HouseCard({
  house,

  rank,
}: {
  house: HouseCol;

  rank: number;
}) {
  return (
    <GridItem>
      <Card className={styles.housePic}>
        <Link href={`./HousePage?house=${house.name[0]}`}>
          <CardBody padding={0} position={"relative"}>
            <Image
              src={`/assets/image/Houses/${house.name[0]}.png`}
              alt={house.name}
              width={window.innerWidth < 450 ? window.innerWidth - 50 : 450}
              style={{ borderRadius: 10 }}
              height={0}
            />
            <div className={styles.rankDisplay}>{rank}</div>
            <div className={styles.housePoints}>{house.points}</div>
          </CardBody>
        </Link>
      </Card>
    </GridItem>
  );
}

export default function Houses() {
  const { houses, isLoading, isError } = useLeaderboard();
  let componentToRender;

  if (isLoading) {
    componentToRender = <h1>Loading...</h1>;
  } else if (isError) {
    componentToRender = <h1>Error</h1>;
  } else {
    componentToRender = houses.map((house, index) => (
      <HouseCard house={house} rank={index + 1} key={index} />
    ));
  }
  return (
    <>
      <Layout>
        <div className={styles.housePage}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            templateRows="repeat(2, 1fr)"
            gap={2}
          >
            {componentToRender}
          </Grid>
        </div>
      </Layout>
    </>
  );
}
