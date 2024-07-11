import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

function BarChartUsers() {
  const data = [
    { month: "Jan", users: 154 },
    { month: "Feb", users: 234 },
    { month: "Mar", users: 835 },
    { month: "Apr", users: 645 },
    { month: "May", users: 345 },
    { month: "Jun", users: 578 },
    { month: "Jul", users: 674 },
  ];

  return (
    <BarChart data={data} width={500} height={300}>
      <XAxis dataKey="month" />
      <YAxis dataKey={"users"} />
      <Tooltip />
      <Legend />
      <Bar dataKey="users" fill="#AAD054" />
    </BarChart>
  );
}

export default BarChartUsers;
