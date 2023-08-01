import { ArrowRightIcon, AtSignIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import classNames from "classnames";
import styles from "@/pages/Auth/Profile.module.css";

export default function LoadingSkeleton() {
  return (
    <Box>
      <div className={styles.container}>
        {/* header with profile photo, name, email, role */}
        <div className={styles.header}>
          {/* profile */}
          <SkeletonCircle size={{ base: "24", lg: "36" }} />

          {/* information */}
          <div className={styles.prime}>
            <div className={styles.name}>
              <Skeleton height={{ base: "1em", lg: "1.5em" }}>
                Segun Adebayo
              </Skeleton>
              <Skeleton height={"1em"}> Student</Skeleton>
            </div>
            <div className={styles.email}>
              <Skeleton height={"1em"}> Student</Skeleton>
            </div>
          </div>

          <div className={styles.edit}>
            <Button
              variant="outline"
              className={classNames("clicky", styles.editProf)}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <Divider />

        {/* footer with phone, roll number, house */}
        <div className={styles.footer}>
          {/* no images only labels and text */}
          {/* phone */}
          <div className={styles.phone}>
            <div>Phone Number</div>
            <div>
              {" "}
              <PhoneIcon />{" "}
              <Skeleton height={"1em"} display={"inline-block"}>
                9876543210
              </Skeleton>
            </div>
          </div>

          {/* roll number */}
          <div className={styles.roll}>
            <div>Roll Number</div>
            <div>
              {" "}
              <AtSignIcon />{" "}
              <Skeleton height={"1em"} display={"inline-block"}>
                9876543210
              </Skeleton>
            </div>
          </div>

          {/* house */}
          <div className={styles.house}>
            <div>House</div>
            <div>
              {" "}
              <ArrowRightIcon />
              <Skeleton height={"1em"} display={"inline-block"}>
                9876543210
              </Skeleton>
            </div>
          </div>
          <Button
            className={classNames("clicky", styles.changePassword)}
            variant={"outline"}
          >
            Change Password
          </Button>
        </div>
      </div>
    </Box>
  );
}
