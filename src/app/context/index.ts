import { createContext } from "react";

export const LayoutContext = createContext({ search: "" });

export const DashboardLayoutContext = createContext({
  msg: "",
  setMsg: (msg: string): void => {
    console.log(msg);
  },
});
