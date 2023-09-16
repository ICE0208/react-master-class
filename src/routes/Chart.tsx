import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data, isError } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    retry: false,
    refetchOnWindowFocus: false, // 창이 focus될 때 refetch
  });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : isError ? (
        <h1>No data</h1>
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
            theme: { mode: isDark ? "dark" : "light" },
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
