import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

import { DEFAULT_CHART_OPTIONS } from "@/lib/charts/defaults";

interface BaseChartProps {
  option: EChartsOption;
  loading?: boolean;
  height?: number | string;
  onEvents?: Record<string, (params: any) => void>;
}

export default function BaseChart({ option, loading = false, height = 400, onEvents }: BaseChartProps) {
  const mergedOption = useMemo(
    () => ({
      ...DEFAULT_CHART_OPTIONS,
      ...option,
    }),
    [option],
  );

  return (
    <ReactECharts
      option={mergedOption}
      style={{
        width: "100%",
        height,
      }}
      showLoading={loading}
      notMerge
      lazyUpdate
      onEvents={onEvents}
    />
  );
}
