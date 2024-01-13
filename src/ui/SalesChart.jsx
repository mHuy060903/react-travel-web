import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesChart = ({ bookings }) => {
  return (
    <div className="bg-white">
      <AreaChart data={bookings} height={300} width={700}>
        <XAxis dataKey="dateStart" />
        <YAxis unit="$" />
        <CartesianGrid />
        <Tooltip />
        <Area dataKey="totalPrice" type="monotone" stroke="red" fill="orange" />
      </AreaChart>
    </div>
  );
};

export default SalesChart;
