import Layout from "../Layout";
import style from "./Houses.module.css";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

function Houses() {
  return (
    <>
      <Layout>
        <h1>Houses</h1>
        <div className={style.housePage}>
          <Grid
            templateColumns="repeat(2, 1fr)"
            templateRows="repeat(2, 1fr)"
            gap={2}
          >
            <GridItem>
              <Card className={style.housePic}>
                <CardBody padding={0}>
                  <Image
                    src="/assets/image/Houses/G.png"
                    alt="Gryffindor"
                    width={400}
                    height={0}
                    style={{ borderRadius: "10px" }}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card className={style.housePic}>
                <CardBody padding={0}>
                  <Image
                    src="/assets/image/Houses/H.png"
                    alt="Hufflepuff"
                    width={400}
                    height={0}
                    style={{ borderRadius: "10px" }}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card className={style.housePic}>
                <CardBody padding={0}>
                  <Image
                    src="/assets/image/Houses/R.png"
                    alt="Ravenclaw"
                    width={400}
                    height={0}
                    style={{ borderRadius: "10px" }}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card className={style.housePic}>
                <CardBody padding={0}>
                  <Image
                    src="/assets/image/Houses/S.png"
                    alt="Slytherin"
                    width={400}
                    height={0}
                    style={{ borderRadius: "10px" }}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </div>
      </Layout>
    </>
  );
}

export default Houses;
