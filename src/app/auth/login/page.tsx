"use client";
import { setCookie } from "@/app/lib/cookie";
import { Box, Button, TextInput } from "@mantine/core";
import { useState } from "react";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event: any) => {
    event.preventDefault(); // 阻止默认提交行为
    if (password !== "" && username !== "") {
      const data = await (
        await fetch("/api/login", {
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
        window.location.href = "/agent";
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
      <Box className="grow mt-[16px] flex flex-col justify-end">
        <Button
          color="#fff"
          className="rounded-[28px] text-[#000] mb-[16px] w-[100%] h-[56px] "
          style={{
            "--button-hover": "#fff",
            "--button-color": "#000",
          }}
          onClick={login}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
