import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import styles from "./Pagination.module.css";

import React from "react";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  items: any[];
}

export default function Pagination({ page, setPage, items }: Props) {
  return (
    <div className={styles.page}>
      <Button
        className="clicky"
        isDisabled={page == 1}
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
      >
        <ArrowLeftIcon />
      </Button>
      <span>{page}</span>
      <Button
        isDisabled={items && items.length < 10}
        className="clicky"
        onClick={() => {
          if (items.length == 10) setPage(page + 1);
        }}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
