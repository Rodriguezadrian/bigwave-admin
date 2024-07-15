import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Container } from "@mui/joy";

function ChartProducts() {
  return (
    <>
      <Container sx={{ display: "flex" }}>
        <Box>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Beverages", "Superfoods ", "Sugars and substitutes"],
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
        </Box>
        <Box>
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
        </Box>
      </Container>
    </>
  );
}
export default ChartProducts;