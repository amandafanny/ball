"use client";
import { Box, Button, Divider, Flex, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "../lib/cookie";

const links = [
  { name: "Dashboard", url: "/nav/dashboard", imgpath: "/img/dashboard.png" },
  { name: "Ball Pools", url: "/nav/ball_pools", imgpath: "/img/img.png" },
  { name: "Explore Agent", url: "/nav/agent", imgpath: "/img/explore.png" },
];

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isBlackBg = pathname === "/nav/dashboard";

  const [walletAddress, setWalletAddress] = useState("");
  useEffect(() => {
    const init = async () => {
      const address = await getCookie("walletAddress");
      if (address) {
        setWalletAddress(address);
      }
    };
    init();
  }, []);

  return (
    <Flex
      style={
        isBlackBg
          ? {
              height: "100vh",
              width: "100vw",
              overflowX: "hidden",
              backgroundImage:
                "url('/img/Duo.png'), linear-gradient(180deg, #FFFFFF 0%, #000000 100%)",
              backgroundPosition: "center,center",
              backgroundRepeat: "repeat,no-repeat",
              backgroundSize: "cover, 100% 100%",
              backgroundBlendMode: "overlay, overlay",
            }
          : {
              height: "100vh",
              width: "100vw",
              overflowX: "hidden",
            }
      }
    >
      <Flex
        direction={"column"}
        align={"center"}
        justify="flex-start"
        className="w-[224px] pt-[50px]"
        style={
          isBlackBg
            ? {
                backgroundColor: "rgba(245, 245, 245, 0.2)",
              }
            : {
                backgroundColor: "rgba(250, 250, 250, 1)",
              }
        }
      >
        <Button
          className="w-[192px] h-[42px] my-[16px] flex items-center justify-center text-[#000] rounded-[100px]"
          color={
            isBlackBg ? "rgba(255, 255, 255, 0.4)" : "rgba(236, 237, 238, 1)"
          }
        >
          <Image
            src={isBlackBg ? "/img/wallet.png" : "/img/wallet_blue.png"}
            alt="Logo"
            width={14}
            height={14}
            className="mr-[16px]"
          />

          <Text size="14px" className="basis-[100px] w-[100px]">
            {walletAddress}
          </Text>
        </Button>
        <Button
          className="w-[192px] h-[42px] my-[16px] flex items-center justify-center text-[#000] rounded-[100px]"
          color={
            isBlackBg ? "rgba(255, 255, 255, 0.4)" : "rgba(236, 237, 238, 1)"
          }
        >
          <Image
            src={"/img/add.png"}
            alt="Logo"
            width={14}
            height={14}
            className="mr-[16px]"
          />
          <Text size="14px" className="basis-[100px] w-[100px]">
            Start New Chart
          </Text>
        </Button>
        <Divider
          size={2}
          color="rgba(217, 217, 217, 1)"
          className="w-[100%] my-[1rem]"
        />
        {links.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className={
              link.url === pathname
                ? "w-[192px] h-[42px] leading-[42px] rounded-[37px] my-[16px] bg-[#fff] flex items-center justify-center border-[1px] border-[#000]"
                : "w-[192px] h-[42px] leading-[42px] rounded-[37px] my-[16px] bg-[#fff] flex items-center justify-center"
            }
          >
            <Image
              src={link.imgpath}
              alt="Logo"
              width={14}
              height={14}
              className="mr-[16px]"
            />
            <Text size="14px" className="basis-[100px]">
              {link.name}
            </Text>
          </Link>
        ))}
        <Divider
          size={2}
          color="rgba(217, 217, 217, 1)"
          className="w-[100%] my-[1rem]"
        />
      </Flex>
      <Box className="grow pt-[50px] px-[16px]">{children}</Box>
    </Flex>
  );
}
