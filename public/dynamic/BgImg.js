import useWindowDimensions from "../WindowDimensions";
import { Img } from "@chakra-ui/react";

export default function BgImg() {
  const { height } = useWindowDimensions();

  return (
    <Img
      sx={{ filter: "blur(500px)" }}
      pointerEvents="none"
      opacity="0.5"
      filter="blur(0.75px) grayscale(25%)"
      position="absolute"
      src="/misi.png"
      alt="BG Gradient"
      height={height}
      maxW="100%"
    />
  )
}