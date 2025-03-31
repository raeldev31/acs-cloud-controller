
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data
const data = [
  {
    name: "00:00",
    "Tráfego Download": 245,
    "Tráfego Upload": 120,
    "Perda de Pacotes": 3,
  },
  {
    name: "04:00",
    "Tráfego Download": 290,
    "Tráfego Upload": 140,
    "Perda de Pacotes": 2,
  },
  {
    name: "08:00",
    "Tráfego Download": 580,
    "Tráfego Upload": 250,
    "Perda de Pacotes": 5,
  },
  {
    name: "12:00",
    "Tráfego Download": 720,
    "Tráfego Upload": 320,
    "Perda de Pacotes": 7,
  },
  {
    name: "16:00",
    "Tráfego Download": 650,
    "Tráfego Upload": 280,
    "Perda de Pacotes": 4,
  },
  {
    name: "20:00",
    "Tráfego Download": 570,
    "Tráfego Upload": 230,
    "Perda de Pacotes": 6,
  },
  {
    name: "23:59",
    "Tráfego Download": 340,
    "Tráfego Upload": 160,
    "Perda de Pacotes": 3,
  },
];

interface StatisticsChartProps {
  title: string;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ title }) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Tráfego Download"
                stroke="#1E40AF"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="Tráfego Upload"
                stroke="#3B82F6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Perda de Pacotes"
                stroke="#EF4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsChart;
