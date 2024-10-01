"use client";
import { Cash } from "@/components/Cash";
import { Goodjob } from "@/components/Goodjob";
import Payment from "@/components/Payment";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps = [Payment, Cash, Goodjob];

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const StepComponents = steps[step];

  const continueHandler1 = () => {
    if (step === 2) {
      router.push("/dashboard");
      return;
    }
    setStep((prev) => prev + 1);
  };

  return (
    <div>
      <StepComponents jump={continueHandler1} />
    </div>
  );
}
