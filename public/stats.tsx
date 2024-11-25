import React, {useEffect, useState} from "react";
import {Box, Divider, Flex, Stat, StatLabel, StatNumber, Text} from "@chakra-ui/react";
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const Stats = () => {
  const [stats, setStats] = useState({
    today: 242,
    thisWeek: 3101,
    thisMonth: 7090,
    thisYear: 34188,
    total: 62109,
  });

  const [chartData, setChartData] = useState<number[]>([]);

  // Function to generate random numbers near the base values
  const generateRandomStats = () => {
    const randomize = (base, range = 10) => {
      const fluctuation = Math.floor(Math.random() * range * 2 + 1) - range; // Random between [-range, +range]
      return Math.max(base + fluctuation, base); // Ensure it's never below the base
    };

    const today = randomize(242, 20);
    const thisWeek = randomize(3101, 100);
    const thisMonth = randomize(7090, 300);
    const thisYear = randomize(34188, 1000);
    const total = randomize(62109, 2000);

    return {today, thisWeek, thisMonth, thisYear, total};
  };

  // Function to generate random chart data points based on today's stats
  const generateRandomChartData = (todayStat) => {
    const baseData = Array.from({length: 7}, () => todayStat); // Start with today's stat as the baseline
    return baseData.map((point) => {
      const fluctuation = Math.floor(Math.random() * 30 - 15); // Random fluctuation ±15
      return Math.max(point + fluctuation, 0); // Ensure no negative values
    });
  };

  // Generate new stats and chart data on component mount
  useEffect(() => {
    const newStats = generateRandomStats();
    setStats(newStats);
    setChartData(generateRandomChartData(newStats.today)); // Generate chart data based on today's stats
  }, []);

  const data = {
    labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"], // X-axis labels
    datasets: [
      {
        label: "Visitors",
        data: chartData, // Dynamically updated chart data
        fill: false,
        backgroundColor: "#00BFFF",
        borderColor: "#00BFFF",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {display: false},
    },
    scales: {
      x: {display: false},
      y: {display: false},
    },
  };

  return (
    <Box
      bgImage="url('https://fastly.picsum.photos/id/329/500/500.jpg?hmac=KTqU2iDXtMGQn59Jiq6EuCrfkL74uh0VyoVax2sSW9Q')" // Replace with your background image
      bgSize="cover"
      color="white"
      borderRadius="md"
      p={4}
      maxW="300px"
      boxShadow="lg"
    >
      <Text fontWeight="bold" mb={2}>
        STATISTIK
      </Text>
      <Box h="100px">
        <Line data={data} options={options}/>
      </Box>
      <Divider my={4} borderColor="white"/>
      <Flex direction="row" gap={2}>
        <Stat>
          <StatLabel fontSize="sm">Hari&emsp;ini</StatLabel>
          <StatNumber fontSize="md">{stats.today}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="sm">Minggu&emsp;ini</StatLabel>
          <StatNumber fontSize="md">{stats.thisWeek}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="sm">Bulan&emsp;ini</StatLabel>
          <StatNumber fontSize="md">{stats.thisMonth}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="sm">Tahun&emsp;ini</StatLabel>
          <StatNumber fontSize="md">{stats.thisYear}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="sm">Total Kunjung</StatLabel>
          <StatNumber fontSize="md">{stats.total}</StatNumber>
        </Stat>
      </Flex>
    </Box>
  );
};

export default Stats;