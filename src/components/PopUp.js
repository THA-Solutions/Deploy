import React from "react";
import styles from "../styles/PopUp.module.css";

export default function PopUp({
  children,
  trigger,
  setTrigger,
  buttonVisible,
  buttonText,
}) {
  return trigger ? (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        {children}
        {buttonVisible ? (
          <button
            className={styles.close_btn}
            onClick={() => setTrigger(false)}
          >
            {buttonText}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    ""
  );
}
