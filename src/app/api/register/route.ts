import { baseUrl } from "..";

export const POST = async (request: Request) => {
  const requestData = JSON.parse(await request.text());

  const response = await fetch(`${baseUrl}/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: 1,
      username: requestData.username,
      password: requestData.password,
      confirmPassword: requestData.confirmPassword,
    }),
    method: "post",
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
    headers: { "Content-Type": "application/json" },
  });
};
