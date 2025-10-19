"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function VisibilityTrendChart({ data }) {
  // Example data format:
  // [
  //   { checked_at: '2025-10-18', ChatGPT: 95, Gemini: 80 },
  //   { checked_at: '2025-10-19', ChatGPT: 90, Gemini: 85 },
  // ]

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Visibility Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="checked_at" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ChatGPT" stroke="#4ade80" />
          <Line type="monotone" dataKey="Gemini" stroke="#f87171" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
