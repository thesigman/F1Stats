import type { EChartsOption } from "echarts";

import BaseChart from "./BaseChart";
import type { ChampionshipHistoryEntry } from "../../types/driver";
import { CHART_COLORS } from "@/lib/charts/chartColors";
import { formatPosition } from "@/lib/charts/formatter";

interface DriverCareerChartProps {
  history: ChampionshipHistoryEntry[];
}

export default function DriverCareerChart({ history }: DriverCareerChartProps) {
  const option: EChartsOption = {
    animation: true,

    tooltip: {
      trigger: "axis",

      formatter: (params: any) => {
        const point = history[params[0].dataIndex];

        return `
          <div style="min-width:180px">
            <strong>${point.year}</strong><br/>

            Position:
            <strong>${point.position ?? "-"}</strong><br/>

            Team:
            ${point.teams.map((team) => team.name).join(", ")}<br/>

            Points:
            ${point.points}<br/>

            Wins:
            ${point.wins}<br/>

            Podiums:
            ${point.podiums}
          </div>
        `;
      },
    },

    grid: {
      left: 50,
      right: 30,
      top: 60,
      bottom: 50,
    },

    xAxis: {
      type: "category",

      data: history.map((season) => season.year),
      axisLabel: {
        color: "#D1D5DB",
        fontSize: 12,
      },
    },

    yAxis: {
      type: "value",
      inverse: true,
      min: 1,
      interval: 1,
      axisLabel: {
        color: "#D1D5DB",
        fontSize: 12,
        formatter: formatPosition,
      },
      splitLine: {
        show: true,
        lineStyle: {
          opacity: 0.2,
          width: 1,
        },
      },
    },

    series: [
      {
        name: "Championship Position",
        type: "line",

        data: history.map((season) => ({
          value: season.position,
          itemStyle: {
            color: season.position === 1 ? CHART_COLORS.champion : CHART_COLORS.blue_marker,
          },
          symbolSize: season.position === 1 ? 12 : 10,
        })),
        smooth: false,
        symbol: "circle",
        symbolSize: 10,
        connectNulls: false,
        lineStyle: {
          color: CHART_COLORS.line,
          width: 3,
          opacity: 0.5,
        },
      },
    ],
  };

  return <BaseChart option={option} height={450} />;
}
