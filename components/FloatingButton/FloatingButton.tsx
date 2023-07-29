import React, { useState } from "react";
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
  onOpen: any;
  SideIcon: React.ElementType;
  HalfText: string;
  RemainingText: string;
  initialWidth: number;
  finalWidth: number;
  rotateBy: number;
}) {
  // for the hovering:
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // declaring variable styles for the button
  const floatBtnStyle = {
    width: `${initialWidth}em`,
  };
  const floatBtnStyleHover = {
    width: `${finalWidth}em`,
  };
  const floatBtnStyleIcon = {
    transform: `rotate(${isHovered ? rotateBy : 0}deg)`,
    transition: "transform 0.2s ease-in-out",
  };

  return (
    <div>
      <button
        style={isHovered ? floatBtnStyleHover : floatBtnStyle}
        className={styles.floatBtn}
        onClick={onOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SideIcon className={styles.icon} style={floatBtnStyleIcon} />
        {HalfText} {isHovered && <span>&nbsp;{RemainingText}</span>}
      </button>
    </div>
  );
}
