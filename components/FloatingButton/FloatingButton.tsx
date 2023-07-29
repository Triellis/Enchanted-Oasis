import React from "react";
import styles from "./FloatingButton.module.css";

export default function FloatingButton({
  onOpen,
  SideIcon,
  HalfText,
  RemainingText,
  initialWidth,
  finalWidth,
  rotateBy,
}: {
  onOpen: () => void;
  SideIcon: any;
  HalfText: string;
  RemainingText: string;
  initialWidth: number;
  finalWidth: number;
  rotateBy: number;
}) {
  // declaring variable styles for the button
  const floatBtnStyle = {
    width: `${initialWidth}em`,

    ":hover": {
      width: `${finalWidth}em`,
    },
    ":hover::after": {
      content: `"${RemainingText}"`,
    },

    ":hover > .${styles.icon}": {
      transform: `rotate(${rotateBy}deg)`,
    },
  };

  return (
    <div>
      <button
        style={floatBtnStyle}
        className={styles.floatBtn}
        onClick={() => {
          onOpen();
        }}
      >
        <SideIcon className={styles.icon} />
        {HalfText}{" "}
      </button>
    </div>
  );
}
