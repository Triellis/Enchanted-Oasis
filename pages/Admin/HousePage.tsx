import { Image, Grid, GridItem, Button } from "@chakra-ui/react";
import style from "./HousePage.module.css";
import Layout from "../Layout";
import { useRouter } from "next/router";

function HousePage() {
  // getting the house from the url or previous page
  const router = useRouter();
  const { house } = router.query;

  let banner = "";
  if (house === "G") {
    banner = "Gb";
  } else if (house === "R") {
    banner = "Rb";
  } else if (house === "H") {
    banner = "Hb";
  } else if (house === "S") {
    banner = "Sb";
  }

  return (
    <Layout>
      <div className={style.main}>
        {/* Banner in the start */}
        <div>
          <Image
            src={`/assets/image/Banners/${banner}.png`}
            alt="Gryffindor"
            className={style.banner}
          />
        </div>

        {/* Remaining contnet beside it */}
        <div>
          {/* Buttons at the top to update points and add users */}
          <div>
            <Button>Points</Button>
          </div>

          {/* List showing the members of the house */}
          <div></div>
        </div>
      </div>
    </Layout>
  );
}

export default HousePage;
