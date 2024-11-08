"use client";

import React from "react";
import EmailVerification from "./EmailVerification";
import PhishingVerification from "./PhishingVerification";

// type Props = {};

export default function PhisingDetectionModule() {
  return (
    <div>
      <EmailVerification />
      {/* <PhishingVerification /> */}
    </div>
  );
}
