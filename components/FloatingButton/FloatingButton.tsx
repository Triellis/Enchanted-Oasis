import React from "react";
import styles from "./FloatingButton.module.scss";

export default function FloatingButton({
  onOpen,
  SideIcon,
  HalfText,
  initialWidth,
  finalWidth,
}: {
  onOpen: () => void;
  SideIcon: any;
  HalfText: string;
  RemainingText: string;
  initialWidth: number;
  finalWidth: number;
}) {
  // declaring variable styles for the button
  const floatBtnStyle = {
    width: initialWidth,
    transition: "width 0.5s",
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
