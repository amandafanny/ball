"use client";
import { Button, Flex, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "@/app/context";
import useToken from "@/app/hooks/useToken";

interface ItemProps {
  name: string;
  marketCap: number;
  percentage: number;
  price: number;
}

// const data = [
//   {
//     name: "testfork1",
//     amount: 1,
//     price: 0,
//     marketCap: 0,
//     ballPollProgress: 0,
//     inBallPool: null,
//     pinkPeriodEndsIn: null,
//     increase: null,
//   },
// ];

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
  const obj = useContext(LayoutContext);

  const [data, setData] = useState<ItemProps[]>([]);

  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/balls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: "pools",
          name: obj.search,
          pageSize: 10,
          pageNo: 1,
          token,
        }),
      });
      const data = await response.json();
      setData(data.data.ballList);
    };
    if (token) {
      fetchData();
    }
  }, [token, obj.search]);

  console.log("data", data);

  return (
    <Flex
      direction={"column"}
      gap={"8px"}
      className="w-[100%] h-[100%] overflow-x-hidden p-[16px]"
    >
      {data.map((val) => (
        <Item key={val.name} {...val} />
      ))}
    </Flex>
  );
}
