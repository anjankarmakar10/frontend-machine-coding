import React, { useState } from "react";
import clsx from "clsx";

import StepList from "./StepList";
import styles from "./SignupForm.module.css";

const PLANS = [
  {
    value: "trial",
    label: "Free Trial",
    description:
      "Start a 2-week free trial, to test the application out and see what you think.",
  },
  {
    value: "advanced",
    label: "Advanced Package",
    description:
      "Take advantage of the full suite of tools. For students and professionals.",
  },
  {
    value: "team",
    label: "Team Package",
    description:
      "Onboard the entire team, for incredible synergy and productivity across the organization.",
  },
];

function SignupForm() {
  const [step, setStep] = React.useState(1);

  const [information, setInformation] = useState({
    name: "",
    email: "",
  });

  const [plan, setPlan] = React.useState(null);

  const selectedPlanData = PLANS.find((p) => p.value === plan);

  const isFinalStep = step === 3;

  function handleResetForm() {
    setInformation({
      name: "",
      email: "",
    });
    setPlan(null);
    setStep(1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextStep = step + 1;

    if (isFinalStep) {
      if (!information.name || !information.email) {
        window.alert("missing data");
        return;
      }
      window.alert(`Submitted:
      Name: ${information.name}
      Email: ${information.email}
      Plan: ${selectedPlanData?.label || "None"}`);
      return;
    }

    setStep(nextStep);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <header className={styles.header}>
        <StepList
          steps={[
            { value: 1, label: "Info" },
            { value: 2, label: "Plan" },
            { value: 3, label: "Summary" },
          ]}
          activeStep={step}
          onStepChange={(newStep) => setStep(newStep)}
        />
      </header>

      {step === 1 && (
        <Info information={information} setInformation={setInformation} />
      )}
      {step === 2 && <Plan plan={plan} setPlan={setPlan} />}
      {step === 3 && (
        <Summary
          information={information}
          selectedPlanData={selectedPlanData}
        />
      )}

      <section className={styles.actions}>
        <button
          onClick={handleResetForm}
          type="button"
          className={clsx(styles.btn, styles.secondary)}
        >
          Reset
        </button>
        <button className={clsx(styles.btn, styles.primary)}>
          {isFinalStep ? "Submit" : "Continue »"}
        </button>
      </section>
    </form>
  );
}

const Info = ({ information, setInformation }) => {
  return (
    <section className={styles.step}>
      <h2>Personal Information</h2>

      <label>Preferred name:</label>
      <input
        value={information.name}
        onChange={(e) =>
          setInformation({ ...information, name: e.target.value })
        }
        required
        type="text"
      />

      <label>Email address:</label>
      <input
        value={information.email}
        onChange={(e) =>
          setInformation({ ...information, email: e.target.value })
        }
        required
        type="email"
      />
    </section>
  );
};

const Plan = ({ plan: value, setPlan }) => {
  return (
    <section className={styles.step}>
      <h2>Select Plan</h2>

      <ul className={styles.planList}>
        {PLANS.map((plan) => (
          <li key={plan.value}>
            <input
              value={plan.value}
              onChange={(e) => setPlan(e.target.value)}
              required
              type="radio"
              name="plan"
              checked={value === plan.value}
            />
            <label>
              <span className={styles.planTitle}>{plan.label}</span>
              <p>{plan.description}</p>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};

const Summary = ({ information, selectedPlanData }) => {
  return (
    <section className={styles.step}>
      <h2>Order Summary</h2>

      <dl>
        <dt>Name:</dt>
        <dd>{information.name}</dd>
        <dt>Email:</dt>
        <dd>{information.email}</dd>
        <dt>Plan:</dt>
        <dd>{selectedPlanData?.label || "(None)"}</dd>
      </dl>
    </section>
  );
};

export default SignupForm;
