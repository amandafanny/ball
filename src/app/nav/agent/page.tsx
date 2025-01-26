"use client";
import {
  Text,
  Flex,
  TextInput,
  Title,
  ActionIcon,
  Box,
  Grid,
  Center,
} from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
interface ItemProps {
  imgPath: string;
  title: string;
  description: string;
}

const Item = ({ title, description, imgPath }: ItemProps) => {
  return (
    <Flex
      align={"center"}
      gap={16}
      className="w-[363px] h-[144px] bg-[#FAFAFA] rounded-[16px] p-[16px]"
    >
      <Image src="/img/Sphere.png" alt="Phone" width={96} height={96} />
      <Flex direction={"column"} gap={16} justify={"start"} className="grow">
        <Text size="18px" c="#000000">
          {title}
        </Text>
        <Text size="12px" c="#000000">
          {description}
        </Text>
        <Text
          size="12px"
          c="#666666"
          className="border-b-[1px] border-[#FFFFFFA3] cursor-pointer"
        >
          creator: name
        </Text>
      </Flex>
    </Flex>
  );
};

const itemList = [
  {
    title: "Wallet Detail",
    description:
      "Here you will be able to see Details of the wallet and other related content.",
    imgPath: "/img/wallet_white.png",
    msg: "Check my wallet balance.",
  },
  {
    title: "Get Agent Onchain",
    description:
      "You can do it here Quickly register for ANS or other content related to ANS.",
    imgPath: "/img/file.png",
    msg: "Could you get my agent onchain?",
  },
  {
    title: "Mint/Burn Balls",
    description:
      "This will be about Explanation or other content Mint/Burn Balls.",
    imgPath: "/img/speak.png",
    msg: "Can you wrap a ball for me?",
  },
  {
    title: "Display Ball Pools",
    description: "This is about Explanation and other content of deploy ball.",
    imgPath: "/img/voice.png",
    msg: "Show current ball pools.",
  },
];

export default function Dashboard() {
  const [msg, setMsg] = useState("");

  return (
    <Center>
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        gap={16}
        className="w-[736px] h-[100%]"
      >
        <Title>Agent</Title>
        <Text c="rgba(0, 0, 0, 0.64)" className="mt-[16px]">
          Speak freely, our artificial intelligence will find your answer
        </Text>
        <TextInput
          placeholder="I’m looking for..."
          leftSection={
            <Image
              src="/img/AI_Icon.png"
              alt="Phone"
              width={22}
              height={22}
              className="ml-[16px]"
            />
          }
          rightSection={
            <Image
              src="/img/arrow_up.png"
              alt="Phone"
              width={40}
              height={40}
              className="mr-[16px]"
              onClick={() => {
                // TODO
              }}
            />
          }
          styles={{
            root: {
              marginTop: "16px",
            },
            input: {
              height: "88px",
              width: "736px",
              borderRadius: "56px",
              paddingLeft: "56px",
            },
          }}
          value={msg}
          onChange={(event) => setMsg(event.currentTarget.value)}
        />
        <Title size={24} className="self-start">
          Featured
        </Title>
        <Grid className="w-[736px]">
          {itemList.map((item) => (
            <Grid.Col span={6}>
              <Item
                key={item.title}
                title={item.title}
                description={item.description}
                imgPath={item.imgPath}
              />
            </Grid.Col>
          ))}
        </Grid>
        <Title size={24} className="self-start">
          Trending
        </Title>
      </Flex>
    </Center>
  );
}
