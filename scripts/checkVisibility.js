"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const engineColors = {
  ChatGPT: "#10B981", // green
  Gemini: "#EF4444",  // red
  // Add more AI engines if needed
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white border p-2 rounded shadow-md">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: engineColors[p.dataKey] || "#3B82F6" }}>
          {p.dataKey}: {p.value}%
        </p>
      ))}
    </div>
  );
};

export default function VisibilityTrendChart({ data }) {
  if (!data || data.length === 0) return null;

  const engines = Object.keys(data[0]).filter((key) => key !== "checked_at");

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Visibility Score Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="checked_at" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {engines.map((engine) => (
            <Bar
              key={engine}
              dataKey={engine}
              fill={engineColors[engine] || "#3B82F6"}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
