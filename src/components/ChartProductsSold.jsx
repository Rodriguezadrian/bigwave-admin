import { Box } from "@mui/joy";
import { LineChart, YAxis, XAxis, Line, Tooltip, Legend } from "recharts";

function ChartProductsSold() {
  const productsChart = [
    { category: "Beverages", sold: 100, stock: 50 },
    { category: "Superfoods", sold: 300, stock: 70 },
    { category: "Snacks", sold: 200, stock: 69 },
    { category: "Pantry and Spices", sold: 250, stock: 0 },
    { category: "Sugars and Subtitutes", sold: 150, stock: 100 },
  ];

  return (
    <Box>
      <LineChart data={productsChart} width={500} height={300}>
        <XAxis dataKey="category"></XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="sold" stroke="#8884d8" />
        <Line dataKey="stock" stroke="#82ca9d" />
      </LineChart>
    </Box>
  );
}
export default ChartProductsSold;
