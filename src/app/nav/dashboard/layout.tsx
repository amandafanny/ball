"use client";
import React, { createContext, useState } from "react";

export const DashboardLayoutContext = createContext({
  msg: "",
  setMsg: (msg: string): void => {
    console.log(msg);
  },
});

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
