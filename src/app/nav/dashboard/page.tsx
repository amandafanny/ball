"use client";
import { Text, Flex, TextInput, Title, ActionIcon } from "@mantine/core";
import Image from "next/image";
import { useContext, useState } from "react";
import { DashboardLayoutContext } from "./layout";
import { useRouter } from "next/navigation";

interface ItemProps {
  imgPath: string;
  title: string;
  description: string;
  msg: string;
  setMsg: (msg: string) => void;
}

const Item = ({ title, description, imgPath, msg, setMsg }: ItemProps) => {
  const router = useRouter();

  return (
    <Flex
      direction={"column"}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.06)" }}
      className="w-[172px] h-[209px] rounded-[16px] p-[16px]"
    >
      <ActionIcon size={40} variant="filled" color="rgba(255, 255, 255, 0.06)">
        <Image src={imgPath} alt="Phone" width={24} height={24} />
      </ActionIcon>
      <Text size="16px" c="rgba(255, 255, 255, 0.86)" className="my-[16px]">
        {title}
      </Text>
      <Text size="12px" c="rgba(255, 255, 255, 0.86)">
        {description}
      </Text>
      <Flex align={"end"} justify={"start"} className="mt-[16px] grow">
        <Text
          size="12px"
          c="rgba(255, 255, 255, 0.64)"
          className="border-b-[1px] border-[#FFFFFFA3] cursor-pointer"
          onClick={() => {
            setMsg(msg);
            router.push("/nav/dashboard/chat");
          }}
        >
          Ask this
        </Text>
        <Image
          src="/img/light.png"
          alt="Phone"
          width={12}
          height={12}
          className="ml-[16px] cursor-pointer"
        />
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
  const dashboardLayoutContext = useContext(DashboardLayoutContext);
  const router = useRouter();

  const [msg, setMsg] = useState("");

  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      className="h-[100%]"
    >
      <Title>What can I help with?</Title>
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
              dashboardLayoutContext.setMsg(msg);
              router.push("/nav/dashboard/chat");
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
      <Text c="rgba(255, 255, 255, 0.32)" className="mt-[16px]">
        You may ask
      </Text>
      <Flex gap={"16px"} className="w-[736px] mt-[16px]">
        {itemList.map((item) => (
          <Item
            key={item.title}
            title={item.title}
            description={item.description}
            imgPath={item.imgPath}
            msg={item.msg}
            setMsg={dashboardLayoutContext.setMsg}
          />
        ))}
      </Flex>
    </Flex>
  );
}
