import clsx from "clsx";

import styles from "./StepList.module.css";

function StepList({ steps, activeStep, onStepChange }) {
  console.log(activeStep);

  return (
    <ol className={styles.stepList}>
      {steps.map((step) => (
        <li key={step.value}>
          <button
            type="button"
            onClick={() => onStepChange(step.value)}
            className={clsx(
              styles.stepListItem,
              step.value === activeStep && styles.active
            )}
          >
            <span className={styles.stepNum}>{step.value}</span>
            {step.label}
          </button>
        </li>
      ))}
    </ol>
  );
}

export default StepList;
