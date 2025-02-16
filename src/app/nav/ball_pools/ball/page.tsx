"use client";
import { DashboardLayoutContext, LayoutContext } from "@/app/context";
import useToken from "@/app/hooks/useToken";
import { Button, Flex, Progress, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface ItemProps {
  name: string;
  marketCap: number;
  amount: number;
  total: number;
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

const Item = ({ name, marketCap, amount, total = 320, price }: ItemProps) => {
  const dashboardLayoutContext = useContext(DashboardLayoutContext);
  const router = useRouter();

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
      <Flex direction="column" gap={10} className="basis-[50px] grow">
        <Text size="16px" fw={500}>
          {amount}/<span className="text-[#00000066]">{total}</span>
        </Text>
        <Text size="12px" c="#666666">
          Amount
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
      <Flex direction="column" gap={10} className="basis-[160px] grow">
        <Flex gap={10} align={"center"}>
          <Progress
            value={(amount * 100) / total}
            animated
            color="orange"
            className="w-[160px]"
          />
          <Text size="14px">{((amount * 100) / total).toFixed(2)}%</Text>
        </Flex>
        <Text size="12px" c="#666666">
          Ball Pool Progress
        </Text>
      </Flex>
      <Flex gap={10} justify={"end"} className="basis-[60px] grow">
        <Button
          color="#ECEDEE"
          className="rounded-[40px] ml-[16px] text-[#000] text-[14px]"
          onClick={() => {
            dashboardLayoutContext.setMsg("");
            router.push("/nav/dashboard/chat");
          }}
        >
          Wrap
        </Button>
      </Flex>
    </Flex>
  );
};

export default function Ball() {
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
          tag: "balls",
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
      className="w-[100%] h-[100%] overflow-x-hidden p-[16px]"
      gap={"8px"}
    >
      {data.map((val) => (
        <Item key={val.name} {...val} />
      ))}
    </Flex>
  );
}
