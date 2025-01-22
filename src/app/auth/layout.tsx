"use client";
import { Flex, Tabs } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";

const tabs = [
  {
    value: "login",
    label: "Login",
  },
  {
    value: "signup",
    label: "Sign Up",
  },
];

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const pathname = usePathname();

  const activate = pathname.split("/")[2];

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage:
          "url('/img/Duo.png'), url('/img/Sphere.png'),linear-gradient(180deg, #FFFFFF 0%, #000000 100%)",
        backgroundPosition: "center,center,center",
        backgroundRepeat: "repeat,no-repeat,no-repeat",
        backgroundSize: "cover,568px 568px, 100% 100%",
        backgroundBlendMode: "overlay, overlay, overlay",
      }}
    >
      <Tabs
        value={activate}
        style={{ "--tabs-list-border-width": 0, "--tabs-color": "#000000" }}
        styles={{
          root: {
            width: "485px",
            height: "568px",
          },
          list: {
            height: "100px",
            borderWidth: 0,
            justifyContent: "center",
            alignItems: "center",
          },
          tab: {
            height: "52px",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        }}
        onChange={(value) => router.push(`/auth/${value}`)}
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={
                activate === tab.value ? "border-b-[4px] text-[24px]" : ""
              }
            >
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {children}
      </Tabs>
    </Flex>
  );
}
