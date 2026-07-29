import type { EChartsOption } from "echarts";

import { CHART_COLORS } from "./chartColors";

export const DEFAULT_CHART_OPTIONS: EChartsOption = {
  backgroundColor: "transparent",

  animation: true,
  animationDuration: 700,
  animationEasing: "cubicOut",

  textStyle: {
    fontFamily: "Manrope",
    fontSize: 13,
    color: CHART_COLORS.text,
  },

  title: {
    textStyle: {
      fontSize: 20,
      fontWeight: "bold",
      color: CHART_COLORS.text,
    },
  },

  grid: {
    left: 50,
    right: 30,
    top: 60,
    bottom: 50,
  },

  tooltip: {
    backgroundColor: CHART_COLORS.tooltipBackground,
    borderColor: CHART_COLORS.tooltipBorder,
    borderWidth: 1,
    textStyle: {
      color: CHART_COLORS.text,
    },
  },
};
