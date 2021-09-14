import { Img } from "@chakra-ui/react";

export default function BgImg() {

  return (
    <Img
      sx={{ filter: "blur(500px)" }}
      pointerEvents="none"
      opacity="0.5"
      filter="blur(0.75px) grayscale(25%)"
      position="absolute"
      src="/misi.png"
      alt="BG Gradient"
      height="75%"
      maxW="100%"
    />
  )
}