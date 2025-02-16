import { baseUrl } from "..";

export const POST = async (request: Request) => {
  const requestData = JSON.parse(await request.text());
  console.log("requestData", requestData);

  const response = await fetch(`${baseUrl}/ball/getBalls`, {
    headers: {
      "Content-Type": "application/json",
      token: requestData.token,
    },
    body: JSON.stringify({
      tag: requestData.tag,
      name: requestData.name,
      pageSize: requestData.pageSize,
      pageNo: requestData.pageNo,
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
