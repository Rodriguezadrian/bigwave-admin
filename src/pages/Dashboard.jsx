import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography, Card, CardContent, CardHeader } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import TimelineIcon from "@mui/icons-material/Timeline";
import PieChartIcon from "@mui/icons-material/PieChart";

function Dashboard() {
  const generateRandomData = (count, max) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * max));
  };

  const monthlySalesData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((month, index) => ({
    month,
    sales: generateRandomData(1, 10000)[0],
  }));

  const categories = [
    "Nuts, Cereals and Seeds",
    "Sugars and Subtitutes",
    "Superfoods",
    "Beverages",
    "Pantry and Spices",
  ];
  const categorySalesData = categories.map((category) => ({
    category,
    sales: generateRandomData(1, 8000)[0],
  }));

  const salesTrendData = monthlySalesData.map((item) => ({
    ...item,
    previousYear: generateRandomData(1, 9000)[0],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
  const salesDistributionData = categories.map((category, index) => ({
    name: category,
    value: generateRandomData(1, 1000)[0],
    color: COLORS[index % COLORS.length],
  }));

  const chartData = [
    {
      title: "Monthly Sales",
      icon: <TrendingUpIcon />,
      chart: (
        <LineChart data={monthlySalesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        </LineChart>
      ),
    },
    {
      title: "Sales by Category",
      icon: <CategoryIcon />,
      chart: (
        <BarChart data={categorySalesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#82ca9d" />
        </BarChart>
      ),
    },
    {
      title: "Sales Trend",
      icon: <TimelineIcon />,
      chart: (
        <LineChart data={salesTrendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            name="This year"
          />
          <Line
            type="monotone"
            dataKey="previousYear"
            stroke="#82ca9d"
            name="Previous year"
          />
        </LineChart>
      ),
    },
    {
      title: "Sales Distribution",
      icon: <PieChartIcon />,
      chart: (
        <PieChart>
          <Pie
            data={salesDistributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {salesDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ),
    },
  ];

  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 3 },
        pt: {
          xs: "calc(12px + var(--Header-height))",
          sm: "calc(12px + var(--Header-height))",
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100dvh",
        gap: 2,
      }}
    >
      <Grid container spacing={3}>
        {chartData.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardHeader
                avatar={item.icon}
                title={<Typography variant="h6">{item.title}</Typography>}
              />
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  {item.chart}
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
