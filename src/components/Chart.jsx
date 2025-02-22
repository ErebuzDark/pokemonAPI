import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const hexToRGBA = (hex, alpha = 0.2) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const typeColors = {
  normal: "#9CA3AF", // gray-400
  fire: "#EF4444", // red-500
  water: "#3B82F6", // blue-500
  electric: "#EAB308", // yellow-500
  grass: "#22C55E", // green-500
  ice: "#06B6D4", // cyan-500
  fighting: "#F97316", // orange-500
  poison: "#9333EA", // purple-500
  ground: "#FB923C", // orange-300
  flying: "#6366F1", // indigo-500
  psychic: "#EC4899", // pink-500
  bug: "#166534", // green-700
  rock: "#374151", // gray-700
  ghost: "#312E81", // indigo-900
  dragon: "#4C1D95", // purple-900
  dark: "#1F2937", // gray-800
  steel: "#9CA3AF", // gray-400
  fairy: "#F9A8D4", // pink-300
};

const RadarChart = ({ stats, types }) => {
  if (!stats) return <p>Loading chart...</p>;

  const statValues = [
    stats.hp,
    stats.attack,
    stats.defense,
    stats["special-attack"],
    stats["special-defense"],
    stats.speed,
  ];

  const primaryType = types[0]?.type.name || "normal";
  const mainColor = typeColors[primaryType] || "#9CA3AF";
  const borderColor = hexToRGBA(mainColor, 1);
  const backgroundColor = hexToRGBA(mainColor, 0.2);

  const maxStat = Math.max(...statValues);
  const suggestedMax = Math.ceil(maxStat / 10) * 10 + 20;

  const data = {
    labels: ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"],
    datasets: [
      {
        label: "Base Stats",
        data: statValues,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: suggestedMax,
        angleLines: { display: true },
        ticks: { stepSize: 20 },
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
