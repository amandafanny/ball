// api/user/agentInfo

import { baseUrl } from "..";

export const GET = async (request: Request) => {
  console.log("request", request);
  // const requestData = JSON.parse(await request.text());

  const response = await fetch(`${baseUrl}/user/agentInfo`, {
    headers: {
      "Content-Type": "application/json",
      // token: requestData.token,
    },
  });

  if (!response.ok) {
    // 如果后端返回错误状态码，返回错误信息
    return new Response(JSON.stringify({ error: "Need Login" }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `wallet_address=${data.default_address_id}`,
    },
  });
};
