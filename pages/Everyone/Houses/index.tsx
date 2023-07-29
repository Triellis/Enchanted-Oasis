import Layout from "../../Layout";
import styles from "./Houses.module.css";
import { Card, CardBody, Grid, GridItem, Link } from "@chakra-ui/react";
import Image from "next/image";
import { fetcher } from "@/lib/functions";
import useSWR from "swr";
import { HouseCol } from "@/lib/types";

import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Link href={`./Houses/${house.name}?houseId=${house._id}`}>
        <GridItem>
          <Card className={styles.housePic}>
            <CardBody padding={0} position={"relative"}>
              <Image
                src={`/assets/image/Houses/${house.name[0]}.png`}
                alt={house.name}
                width={window.innerWidth < 500 ? window.innerWidth - 50 : 400}
                style={{ borderRadius: 10 }}
                height={0}
              />
              <div className={styles.rankDisplay}>{rank}</div>
              <div className={styles.housePoints}>{house.points}</div>
            </CardBody>
          </Card>
        </GridItem>
      </Link>
    </motion.div>
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
