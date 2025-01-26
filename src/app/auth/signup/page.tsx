"use client";
import { setCookie } from "@/app/lib/cookie";
import { Box, Button, TextInput } from "@mantine/core";
import { useState } from "react";

export default function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const register = async (event: any) => {
    if (
      confirmPassword === password &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,32})/.test(
        password
      )
    ) {
      const data = await (
        await fetch("/api/register", {
          body: JSON.stringify({
            username,
            password,
            confirmPassword,
          }),
          method: "post",
        })
      ).json();
      console.log("data", data);
      if (data.code === 0) {
        setCookie("token", data.data.token);
        window.location.href = "/agent";
      }
    }
  };

  return (
    <Box className="w-[485px] h-[420px] p-[16px] bg-[#D9D9D999] rounded-3xl flex flex-col">
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
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <TextInput
        required
        label="ConfirmPassword"
        type="password"
        placeholder="Enter your confirmed Password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
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
          onClick={register}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
