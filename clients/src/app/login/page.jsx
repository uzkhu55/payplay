"use client";
import { useState } from "react";
import { Login } from "@/components/Login";

const jumper = [Login];

export default function Page() {
  const [step, setStep] = useState(0);
  const StepComponents = jumper[step];

  const continueHandler1 = () => {
    setStep((prev) => prev + 1);
    return;
  };
  return (
    <div>
      <StepComponents jump={continueHandler1} />
    </div>
  );
}
