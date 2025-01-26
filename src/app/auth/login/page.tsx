"use client";
import { setCookie } from "@/app/lib/cookie";
import { Box, Button, Flex, Text, TextInput } from "@mantine/core";
import { useState } from "react";

export default function Login() {
  const [username, setUserName] = useState("test2@gmail.com");
  const [password, setPassword] = useState("Test123456!");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = async (event: any) => {
    event.preventDefault(); // 阻止默认提交行为
    if (password !== "" && username !== "") {
      const data = await (
        await fetch("/api/login", {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
          method: "post",
        })
      ).json();
      console.log("data", data);
      if (data.code === 0) {
        console.log("注册成功");
        setCookie("token", data.data.token);
        window.location.href = "/nav";
      }
    }
  };

  return (
    <Box className="w-[485px] h-[380px] p-[16px] bg-[#D9D9D999] rounded-3xl flex flex-col">
      <TextInput
        required
        label="Email"
        placeholder="Enter your Email"
        value={username}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <TextInput
        required
        label="Password"
        placeholder="Enter your Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Flex
        direction={"column"}
        align={"center"}
        justify={"space-between"}
        className="grow mt-[16px]"
      >
        <Text c="#fff">Forget password?</Text>
        <Button
          color="#fff"
          className="rounded-[28px] text-[#000] w-[100%] h-[56px] "
          style={{
            "--button-hover": "#fff",
            "--button-color": "#000",
          }}
          onClick={login}
        >
          Login
        </Button>
      </Flex>
    </Box>
  );
}
