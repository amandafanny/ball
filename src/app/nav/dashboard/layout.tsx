"use client";
import { DashboardLayoutContext } from "@/app/context";
import React, { useState } from "react";

export default function BullLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [msg, setMsg] = useState("");
  return (
    <DashboardLayoutContext.Provider value={{ msg, setMsg }}>
      {children}
    </DashboardLayoutContext.Provider>
  );
}
