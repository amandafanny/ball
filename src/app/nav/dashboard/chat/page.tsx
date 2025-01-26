"use client";
import { Flex, Center, Box, Select, Textarea } from "@mantine/core";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { DashboardLayoutContext } from "@/app/context";
import SHA256 from "crypto-js/sha256";
import useToken from "@/app/hooks/useToken";

type MessageType = "agent" | "user";

interface Message {
  type: MessageType;
  content: string;
  hash: string;
}

const Item = ({ type, content, hash }: Message) => {
  if (type === "agent") {
    return (
      <Flex align={"start"} key={hash}>
        <div className="flex-shrink-0">
          <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
            A
          </div>
        </div>
        <div className="ml-3">
          <div className="bg-[#fff] p-4 rounded-lg max-w-sm">{content}</div>
        </div>
      </Flex>
    );
  }
  return (
    <Flex key={hash} align={"start"} justify={"end"}>
      <div className="mr-3">
        <div className="bg-[#F5F5F5] p-4 rounded-lg max-w-sm">{content}</div>
      </div>
      <div className="flex-shrink-0">
        <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center">
          U
        </div>
      </div>
    </Flex>
  );
};

export default function Dashboard() {
  const dashboardLayoutContext = useContext(DashboardLayoutContext);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const token = useToken();

  const [msg, setMsg] = useState("");
  const [isInit, setIsInit] = useState(true);
  const [messageList, setMessageList] = useState<Message[]>([]);

  useEffect(() => {
    if (dashboardLayoutContext && isInit) {
      const initMsg = dashboardLayoutContext.msg;
      console.log("dashboardLayoutContext", initMsg);
      setMsg(initMsg);
      // setMessageList([
      //   { content: initMsg, hash: SHA256(initMsg).toString(), type: "user" },
      // ]);
      setMessageList([
        { content: "xx", hash: SHA256("xx").toString(), type: "user" },
        { content: "xxx", hash: SHA256("xxx").toString(), type: "agent" },
        { content: "xxxx", hash: SHA256("xxxx").toString(), type: "user" },
        { content: "xxxxx", hash: SHA256("xxxxx").toString(), type: "agent" },
        { content: "xxxxxx", hash: SHA256("xxxxxx").toString(), type: "user" },
        {
          content: "xxxxxxx",
          hash: SHA256("xxxxxxx").toString(),
          type: "agent",
        },
        {
          content: "xxxxxxxx",
          hash: SHA256("xxxxxxxx").toString(),
          type: "user",
        },
      ]);
      setIsInit(false);
    }
    // return () => {
    //   dashboardLayoutContext.setMsg("");
    //   console.log("dashboardLayoutContext-->", dashboardLayoutContext.msg);
    // };
  }, [dashboardLayoutContext, isInit]);

  useEffect(() => {
    console.log("msg==>", messageList);
  }, [messageList]);

  useEffect(() => {
    if (token === null) {
      return;
    }
    // 建立 WebSocket 连接
    const ws = new WebSocket(`ws://test-api.agentball.ai/chat?token=${token}`);

    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket连接已建立");
    };

    ws.onmessage = (event) => {
      console.log("收到消息:", event.data);
      if (event.data !== "") {
        setMessageList((prevMessages: Message[]) => {
          const list = [
            ...prevMessages,
            {
              type: "agent" as MessageType,
              content: event.data,
              hash: SHA256(event.data).toString(),
            },
          ];
          if (list.length < 10) {
            return list;
          }
          return list.slice(-10);
        });
      }
    };

    ws.onclose = () => {
      console.log("WebSocket连接已关闭");
    };

    ws.onerror = (error) => {
      console.error("WebSocket错误:", error);
    };

    // 清理: 组件卸载时关闭 WebSocket 连接
    return () => {
      if (ws) ws.close();
    };
  }, [token]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyDown = (event: any) => {
    console.log("event.key", event.key);
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
      setMessageList((prevMessages: Message[]) => {
        const list = [
          ...prevMessages,
          {
            type: "user" as MessageType,
            content: msg,
            hash: SHA256(msg).toString(),
          },
        ];
        if (list.length < 10) {
          return list;
        }
        return list.slice(-10);
      });
      setMsg("");
    }
  };

  return (
    <Center className="h-[100%]">
      <Flex direction={"column"} className="h-[100%] w-[735px]">
        <Box className="grow overflow-x-hidden overflow-y-auto">
          {messageList.map((val) => (
            <Item
              key={val.hash}
              hash={val.hash}
              content={val.content}
              type={val.type}
            />
          ))}
        </Box>
        <Flex
          gap={"16px"}
          direction={"column"}
          className="w-[736px] h-[160px] p-[16px] bg-[#F5F5F5] my-[16px] rounded-[24px]"
        >
          <Textarea
            placeholder="I’m looking for..."
            leftSection={
              <Image
                src="/img/AI_Icon.png"
                alt="Phone"
                width={22}
                height={22}
                className="mx-[16px]"
              />
            }
            styles={{
              root: {
                marginTop: 0,
                flexGrow: 1,
              },
              section: {
                alignItems: "flex-start",
              },
              input: {
                height: "100%",
                width: "100%",
                border: 0,
                backgroundColor: "inherit",
              },
            }}
            value={msg}
            onChange={(event) => setMsg(event.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
          <Flex justify={"space-between"}>
            <Select
              value={"Models 1"}
              data={[
                {
                  value: "Models 1",
                  label: "Models 1",
                },
              ]}
              styles={{
                root: {
                  width: "114px",
                },
                input: {
                  border: 0,
                  borderRadius: "16px",
                },
              }}
            />
            <Image
              src="/img/arrow_up.png"
              alt=""
              width={40}
              height={40}
              onClick={sendMessage}
            />
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
}
