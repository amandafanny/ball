import { useEffect, useState } from "react";
import { getCookie } from "../lib/cookie";

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const tokenValue = await getCookie("token");
      setToken(tokenValue);
    };

    fetchToken();
  }, []);

  return token;
};

export default useToken;
