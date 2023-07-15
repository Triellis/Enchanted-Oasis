import Image from "next/image";
import React from "react";

import styles from "./Profile.module.css";
import Layout from "../Layout";
import { Avatar, Button, Divider } from "@chakra-ui/react";

export default function Profile() {
  const isAdmin = false;
  let house = "Gryffindor";

  return (
    <>
      <Layout>
        <div className={styles.container}>
          {/* show house banner if user is not admin */}
          {!isAdmin && (
            <div className={styles.banner}>
              <Image
                className={styles.houseB}
                src="/assets/image/Banners/Gb.png"
                alt="Gryffindor"
                width={160}
                height={0}
              />
            </div>
          )}

          <div className={styles.content}>
            
            {/* Profile picture */}
            <div className={styles.Header}>
              <Avatar size={{ sm: "xl", base: "lg", lg: "2xl" }} />
            </div>


            {/* Details */}
            <div className={styles.details}>
              <div className={styles.detailsItem}>
                <label htmlFor="name" className={styles.label}>
                  Name:
                </label>
                <div className={styles.contentBox}>
                  <span id="name" className={styles.text}>
                    John Doe
                  </span>
                </div>
              </div>
              <div className={styles.detailsItem}>
                <label htmlFor="role" className={styles.label}>
                  Role:
                </label>
                <div className={styles.contentBox}>
                  <span id="role" className={styles.text}>
                    Student
                  </span>
                </div>
              </div>
              <div className={styles.detailsItem}>
                <label htmlFor="email" className={styles.label}>
                  Email:
                </label>
                <div className={styles.contentBox}>
                  <span id="email" className={styles.text}>
                    johndoe@example.com
                  </span>
                </div>
              </div>
              <div className={styles.detailsItem}>
                <label htmlFor="phone" className={styles.label}>
                  Phone:
                </label>
                <div className={styles.contentBox}>
                  <span id="phone" className={styles.text}>
                    123-456-7890
                  </span>
                </div>
              </div>
              <div className={styles.detailsItem}>
                <label htmlFor="rollNumber" className={styles.label}>
                  Roll Number:
                </label>
                <div className={styles.contentBox}>
                  <span id="rollNumber" className={styles.text}>
                    123456
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
