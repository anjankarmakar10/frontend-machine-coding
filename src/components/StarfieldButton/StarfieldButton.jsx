/*
Acceptance Criteria:

• Pressing and holding the specified keyboard key for 1 second should “activate” the button, firing a callback that is specified by the parent.
• The button shouldn't have to be focused for this to work.
• Clicking/tapping the button should also activate the button. This is important, since not everyone will be able to press and hold the key (eg. touchscreen users).
• If the user releases the keyboard key before the full second has elapsed, the activation should be cancelled, and nothing should happen.
• The progress should be represented visually, by setting the `--progress` CSS variable on the `<button>`. This value should range from 0 (default) to 1 (fully activated).
• When the button is fully activated, you can add the `"confirmed"` CSS class to apply the “flash” animation, shown in the video above.
*/

import clsx from "clsx";

import styles from "./StarfieldButton.module.css";
import { useEffect, useRef } from "react";
import { useState } from "react";

function StarfieldButton({ letter, onClick }) {
  const [pogress, setProgress] = useState(0);
  const [isHoldingKeyDown, setIsHoldingKetDown] = useState(false);
  let intervalId = useRef();

  useEffect(() => {
    if (isHoldingKeyDown) return;

    const handleKeyDown = (event) => {
      if (event.key === letter) {
        setIsHoldingKetDown(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [letter]);

  useEffect(() => {
    if (!isHoldingKeyDown) return;

    intervalId.current = setInterval(() => {
      setProgress((prev) => prev + 0.02);
    }, 16);

    const handleKeyUp = (event) => {
      if (event.key !== letter) return;

      clearInterval(intervalId.current);
      setProgress(0);
      setIsHoldingKetDown(false);
    };
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [isHoldingKeyDown, letter]);

  useEffect(() => {
    if (pogress >= 1) {
      onClick();
      clearInterval(intervalId.current);
    }
  }, [pogress, onClick]);

  return (
    <button
      // Add the "styles.confirmed" class to
      // apply the confirmation flash animation:
      className={clsx(styles.wrapper, pogress >= 1 && styles.confirmed)}
      // This value controls the visual progress
      // animation. Ranges from 0 to 1:
      style={{ "--progress": pogress }}
    >
      <span className={styles.letter}>{letter}</span>
      <span className={styles.underline} />
    </button>
  );
}

export default StarfieldButton;
