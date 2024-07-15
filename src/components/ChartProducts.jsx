import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Container, Typography, Grid } from "@mui/material";

function ChartProducts() {
  // Sample data for monthly sales
  const monthlySalesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 5500 },
    { month: "Jul", sales: 7000 },
    { month: "Aug", sales: 6500 },
    { month: "Sep", sales: 5800 },
    { month: "Oct", sales: 6200 },
    { month: "Nov", sales: 7500 },
    { month: "Dec", sales: 8000 },
  ];

  // Sample data for annual sales
  const annualSalesData = [
    { year: 2019, sales: 50000 },
    { year: 2020, sales: 55000 },
    { year: 2021, sales: 60000 },
    { year: 2022, sales: 65000 },
    { year: 2023, sales: 70000 },
  ];

  // Sample data for product category sales
  const categorySalesData = [
    { id: 0, value: 40, label: "Beverages" },
    { id: 1, value: 30, label: "Superfoods" },
    { id: 2, value: 20, label: "Sugars and substitutes" },
    { id: 3, value: 10, label: "Others" },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Sales Analysis
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Product Category Sales</Typography>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Beverages", "Superfoods", "Sugars and substitutes"],
              },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={500}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Sales Trend</Typography>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            width={500}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Monthly Sales</Typography>
          <BarChart
            xAxis={[{ scaleType: "band", data: monthlySalesData.map(item => item.month) }]}
            series={[{ data: monthlySalesData.map(item => item.sales) }]}
            width={500}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Annual Sales</Typography>
          <LineChart
            xAxis={[{ data: annualSalesData.map(item => item.year) }]}
            series={[
              {
                data: annualSalesData.map(item => item.sales),
                area: true,
              },
            ]}
            width={500}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Product Category Distribution</Typography>
          <PieChart
            series={[
              {
                data: categorySalesData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30 },
              },
            ]}
            height={300}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChartProducts;