import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => Number(price.close)) ?? [],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              zoom: { enabled: false },
              background: "transparent",
              animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
              },
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            xaxis: {
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
              // type: "datetime",
              categories:
                data?.map((price) => {
                  let date = new Date(price.time_close * 1000);
                  return date.toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                }) ?? [],
            },
            yaxis: { show: false },
            tooltip: { y: { formatter: (value) => `$${value.toFixed(3)}` } },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#e25959", "#006bf8"],
                stops: [0, 100],
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
