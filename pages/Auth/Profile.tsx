import Image from "next/image";
import React from "react";

import styles from "./Profile.module.css";
import Layout from "../Layout";
import { Avatar, Badge, Button, Divider } from "@chakra-ui/react";

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

            <div>
              <div className={styles.avatar}>
                <Avatar size={{ sm: "xl", base: "lg", lg: "2xl" }} />
              </div>
              <div className={styles.primaryInfo}>
                {/* Name */}
                <div className={styles.name}>
                  <h1>John Doe</h1>
                </div>
                {/* Email */}
                <div className={styles.email}>
                  <h2>johndoe@gmail.com</h2>
                </div>
                {/* Role */}
                <div className={styles.role}>
                  <Badge colorScheme="teal" className={styles.badge}>
                    Student
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* other information */}
          <div className={styles.otherInfo}>
            {/* Roll number */}
            <div className={styles.roll}>
              <h3>Roll Number</h3>
              <p>123456789</p>
            </div>
            {/* Phone number */}
            <div className={styles.phone}>
              <h3>Phone Number</h3>
              <p>123456789</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
