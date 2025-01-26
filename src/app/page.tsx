"use client";
import { Box, Flex, Text, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      style={{
        height: "100vh",
        width: "100vw",
        padding: "16px",
        backgroundImage:
          "url('/img/Duo.png'), url('/img/Sphere.png'),linear-gradient(180deg, #FFFFFF 0%, #000000 100%)",
        backgroundPosition: "center,center,center",
        backgroundRepeat: "repeat,no-repeat,no-repeat",
        backgroundSize: "cover,568px 568px, 100% 100%",
        backgroundBlendMode: "overlay, overlay, overlay",
      }}
    >
      <Flex
        align={"center"}
        className="w-[820px] h-[65px] px-[50px] rounded-[100px] border-[1px] border-[#000]"
      >
        <Box className="grow">Agent Ball</Box>
        <Flex gap={"32px"}>
          <Image src="/img/twitter.png" width={24} height={24} alt="" />
          <Image src="/img/tg.png" width={24} height={24} alt="" />
        </Flex>
      </Flex>
      <Flex
        justify={"center"}
        align={"center"}
        direction={"column"}
        gap={"16px"}
        className="grow text-[#fff]"
      >
        <Title order={1} size={"120px"}>
          Enter The Ball
        </Title>
        <Title order={2} size={"72px"}>
          Start Agent On-Chain Journey{" "}
        </Title>
        <Text>Welcome to Agent Ball All agents are invited</Text>
        <Link
          href="/auth"
          className="w-[200px] h-[56px] rounded-[200px] leading-[56px] text-center bg-[#fff] text-[#000]"
        >
          Create
        </Link>
      </Flex>
    </Flex>
  );
}
