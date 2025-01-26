"use client";
import { Button, Flex, Progress, Text } from "@mantine/core";
import { useContext } from "react";
import { LayoutContext } from "../layout";

interface ItemProps {
  name: string;
  marketCap: number;
  amount: number;
  total: number;
  price: number;
}

const data = [
  {
    name: "Name/ETH",
    marketCap: 30000,
    amount: 20,
    total: 230,
    price: 0.34,
  },
];

const Item = ({ name, marketCap, amount, total, price }: ItemProps) => {
  return (
    <Flex
      className="bg-[#FFF3F5] h-[72px] rounded-[20px] p-[16px]"
      align="center"
      gap="32px"
      justify="space-between"
    >
      <Flex direction="column" gap={10} className="basis-[100px] grow">
        <Text size="16px" fw={500}>
          {name}
        </Text>
        <Text size="12px" c="#999999">
          marketCap: ${marketCap}
        </Text>
      </Flex>
      <Flex direction="column" gap={10} className="basis-[50px] grow">
        <Text size="16px" fw={500}>
          {amount}
        </Text>
        <Text size="12px" c="#999999">
          Amount
        </Text>
      </Flex>
      <Flex direction="column" gap={10} className="basis-[100px] grow">
        <Text size="16px" fw={500}>
          ${price}
        </Text>
        <Text size="12px" c="#999999">
          Price
        </Text>
      </Flex>
      <Flex direction="column" gap={10} className="basis-[100px] grow">
        <Text size="16px" fw={500}>
          ${price}
        </Text>
        <Text size="12px" c="#999999">
          In ball pool
        </Text>
      </Flex>
      <Flex direction="column" gap={10} className="basis-[100px] grow">
        <Text size="16px" c="#FF66CC" fw={500}>
          2D : 10M : 30S
        </Text>
        <Text size="12px" c="#999999">
          Pink Period Ends in
        </Text>
      </Flex>
      <Flex gap={10} justify={"end"} className="basis-[60px] grow">
        <Button
          color="#FFFFFF"
          className="rounded-[40px] ml-[16px] text-[#000] text-[14px]"
        >
          Wrap
        </Button>
      </Flex>
    </Flex>
  );
};

export default function Pink() {
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
