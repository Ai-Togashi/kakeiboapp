"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataItem {
  name: string;
  value: number;
}

interface CustomPieChartProps {
  title: string;
  data: DataItem[];
}

const COLORS = ["#a78bfa", "#67e8f9", "#86efac", "#fcd34d", "#f87171"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#003300"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      ¥{value.toLocaleString()}
    </text>
  );
};

const CustomPieChart: React.FC<CustomPieChartProps> = ({ title, data }) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={renderCustomizedLabel}
              labelLine={false}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomPieChart;


