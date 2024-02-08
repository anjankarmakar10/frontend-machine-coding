import { useCallback, useState } from "react";
import styles from "./ClickingOutside.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";

function ClickingOutside() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
  }, []);

  const popoverRef = useOutsideClick(handleClickOutside);

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <button
          className={styles.accountToggleTrigger}
          aria-label="Toggle account dropdown"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img alt="" src="/profile.png" />
        </button>

        {isOpen && (
          <div ref={popoverRef} className={styles.popover}>
            <ul className={styles.accountLinks}>
              <li>
                <a>My Account</a>
              </li>
              <li>
                <a>Statistics</a>
              </li>
              <li>
                <a>Log out</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default ClickingOutside;
