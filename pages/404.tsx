// @ts-nocheck
import React from "react";
import Head from "next/head";
import { Box, Heading, Text, Button, Icon, keyframes } from "@chakra-ui/react";
import { useRouter } from "next/router";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const NotFoundIcon = (props: any) => (
    <Icon viewBox="0 0 200 200" {...props}>
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.3" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
        <text x="100" y="80" textAnchor="middle" fontSize="24" fill="currentColor" fontWeight="bold" opacity="0.5">
            ?
        </text>
        <path
            d="M70 120 Q100 140 130 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.4"
            transform="rotate(180, 100, 130)"
        />
        <circle cx="75" cy="95" r="5" fill="currentColor" opacity="0.4" />
        <circle cx="125" cy="95" r="5" fill="currentColor" opacity="0.4" />
    </Icon>
);

const NotFound = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>404 — Halaman Tidak Ditemukan</title>
                <meta name="description" content="Halaman yang Anda cari tidak ditemukan." />
            </Head>
            <Box
                as="main"
                sx={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #EBF8FF 0%, #F7FAFC 50%, #E6FFFA 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    px: 4,
                }}
            >
                {/* Background decorative circles */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "-10%",
                        right: "-5%",
                        width: { base: "200px", md: "400px" },
                        height: { base: "200px", md: "400px" },
                        borderRadius: "full",
                        bg: "blue.100",
                        opacity: 0.3,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "-15%",
                        left: "-10%",
                        width: { base: "250px", md: "500px" },
                        height: { base: "250px", md: "500px" },
                        borderRadius: "full",
                        bg: "blue.100",
                        opacity: 0.25,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: "20%",
                        left: "10%",
                        width: { base: "80px", md: "150px" },
                        height: { base: "80px", md: "150px" },
                        borderRadius: "full",
                        bg: "teal.50",
                        opacity: 0.4,
                    }}
                />

                {/* Content */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        zIndex: 1,
                        maxWidth: "600px",
                    }}
                >
                    {/* Floating animated icon */}
                    <Box animation={`${float} 3s ease-in-out infinite`} mb={6}>
                        <NotFoundIcon
                            w={{ base: "120px", md: "180px" }}
                            h={{ base: "120px", md: "180px" }}
                            color="blue.400"
                        />
                    </Box>

                    {/* 404 */}
                    <Heading
                        fontSize={{ base: "7xl", md: "9xl" }}
                        fontWeight="extrabold"
                        bgGradient="linear(to-r, blue.600, blue.400, teal.400)"
                        bgClip="text"
                        lineHeight="1"
                        mb={2}
                    >
                        404
                    </Heading>

                    {/* Title */}
                    <Heading
                        fontSize={{ base: "xl", md: "2xl" }}
                        color="gray.700"
                        mb={3}
                        fontWeight="semibold"
                    >
                        Halaman Tidak Ditemukan
                    </Heading>

                    {/* Description */}
                    <Text
                        fontSize={{ base: "sm", md: "md" }}
                        color="gray.500"
                        mb={8}
                        maxW="400px"
                        lineHeight="tall"
                    >
                        Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah
                        dipindahkan. Silakan kembali ke beranda.
                    </Text>

                    {/* Action buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            size="lg"
                            colorScheme="blue"
                            onClick={() => router.push("/")}
                            px={8}
                            rounded="lg"
                            shadow="md"
                            _hover={{
                                shadow: "lg",
                                transform: "translateY(-2px)",
                            }}
                            transition="all 0.2s"
                        >
                            Kembali ke Beranda
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            colorScheme="blue"
                            onClick={() => router.back()}
                            px={8}
                            rounded="lg"
                            _hover={{
                                bg: "blue.50",
                                transform: "translateY(-2px)",
                            }}
                            transition="all 0.2s"
                        >
                            Halaman Sebelumnya
                        </Button>
                    </Box>

                    {/* Animated dots */}
                    <Box sx={{ display: "flex", gap: "8px", mt: 12 }}>
                        {[0, 1, 2].map((i) => (
                            <Box
                                key={i}
                                w="8px"
                                h="8px"
                                borderRadius="full"
                                bg="blue.300"
                                animation={`${pulse} 1.5s ease-in-out ${i * 0.3}s infinite`}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NotFound;
