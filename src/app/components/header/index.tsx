import { Box, Flex } from "@mantine/core";
import Image from "next/image";

const Header = () => {
  return (
    <Flex
      align={"center"}
      className="w-[820px] h-[65px] px-[50px] rounded-[100px] border-[1px] border-[#000]"
    >
      <Box className="grow">Agent Ball</Box>
      <Flex gap={"32px"}>
        <Image src="/img/twitter.png" width={24} height={24} alt="" />
        <Image src="/img/tg.png" width={24} height={24} alt="" />
      </Flex>
    </Flex>
  );
};

export default Header;
