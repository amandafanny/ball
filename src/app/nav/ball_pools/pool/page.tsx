"use client";
import { Button, Flex, Text } from "@mantine/core";
import { useContext } from "react";
import { LayoutContext } from "@/app/context";

interface ItemProps {
  name: string;
  marketCap: number;
  percentage: number;
  total: number;
  price: number;
}

const data = [
  {
    name: "Name/ETH",
    marketCap: 30000,
    percentage: 20,
    total: 230,
    price: 0.34,
  },
];

const Item = ({ name, marketCap, percentage, price }: ItemProps) => {
  return (
    <Flex
      className="bg-[#FAFAFA] h-[72px] rounded-[20px] p-[16px]"
      align="center"
      gap="32px"
      justify="space-between"
    >
      <Flex direction="column" gap={10} className="basis-[100px] grow">
        <Text size="16px" fw={500}>
          {name}
        </Text>
        <Text size="12px" c="#000000">
          Market Cap: ${marketCap}
        </Text>
      </Flex>
      <Flex direction="column" gap={10} className="basis-[100px] grow">
        <Text size="16px" fw={500}>
          ${price}
        </Text>
        <Text size="12px" c="#666666">
          Price
        </Text>
      </Flex>
      <Flex direction="column" gap={10} className="basis-[50px] grow">
        <Text size="16px" fw={500} c={percentage > 0 ? "#34A353" : "red"}>
          {percentage}%
        </Text>
        <Text size="12px" c="#666666">
          {percentage > 0 ? "Increase" : "Decrease"} Percentage
        </Text>
      </Flex>
      <Flex gap={10} justify={"end"} className="basis-[60px] grow">
        <Button
          color="#ECEDEE"
          className="rounded-[40px] ml-[16px] text-[#000] text-[14px]"
        >
          Go Uniswap
        </Button>
      </Flex>
    </Flex>
  );
};

export default function Pool() {
  const a = useContext(LayoutContext);
  console.log("a", a);

  return (
    <Flex
      direction={"column"}
      className="w-[100%] h-[100%] overflow-x-hidden p-[16px]"
    >
      {data.map((val) => (
        <Item key={val.name} {...val} />
      ))}
    </Flex>
  );
}
