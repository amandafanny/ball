"use client";
import { LayoutContext } from "@/app/context";
import { Box, Tabs, TextInput } from "@mantine/core";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const tabs = [
  {
    value: "ball",
    label: "Ball",
    color: "#000",
  },
  {
    value: "pink",
    label: "Pink",
    color: "#FF66CC",
  },
  {
    value: "pool",
    label: "Pool",
    color: "#000",
  },
];

export default function BullLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const activate = pathname.split("/")[3];

  const [search, setSearch] = useState("");

  return (
    <Tabs
      value={activate}
      style={{ "--tabs-list-border-width": 0, "--tabs-color": "#000000" }}
      styles={{
        root: {
          width: "100%",
          height: "calc(100% - 52px)",
        },
        list: {
          borderWidth: 0,
        },
        tab: {
          height: "52px",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      }}
      onChange={(value) => router.push(`/nav/ball_pools/${value}`)}
    >
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            className={
              activate === tab.value ? "border-b-[4px] text-[24px]" : ""
            }
            style={{
              color: tab.color,
            }}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
        <Box className="grow">
          <TextInput
            styles={{
              root: {
                width: "400px",
                justifySelf: "flex-end",
                flexGrow: 1,
              },
              input: {
                borderRadius: "79px",
                height: "48px",
                paddingLeft: "16px",
              },
            }}
            placeholder="search"
            rightSection={
              <Image
                src="/img/search.png"
                alt="search"
                width={24}
                height={24}
                className="mr-[16px]"
              />
            }
            value={search}
            onChange={(v) => {
              setSearch(v.currentTarget.value);
            }}
          />
        </Box>
      </Tabs.List>
      <LayoutContext.Provider value={{ search }}>
        {children}
      </LayoutContext.Provider>
    </Tabs>
  );
}
