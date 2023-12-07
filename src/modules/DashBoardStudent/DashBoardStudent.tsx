import { Spin } from "antd";
import EChartsReact from "echarts-for-react";
import { useMemo } from "react";

import { TChart, TClassification } from "@/modules/DashBoardStudent/types";
import { useGetGender } from "@/services/api/students/useGetGender";
import { useGetStudentStatistics } from "@/services/api/students/useGetStudentStatistics";
import { parseDataToJSON } from "@/utils/parseDataToJSON";

import style from "./DashBoardStudentStyle.module.scss";
export default function DashBoardStudent() {
  const { data: dataGenders, isLoading: isLoadingGender } = useGetGender();
  const { data: dataClassification, isLoading: isLoadingClassification } =
    useGetStudentStatistics();
  const convertDataClassificationToChartOptions = () => {
    const dataJSON = parseDataToJSON<TClassification>(dataClassification);
    return dataJSON.map(item => ({ value: item.value, name: item.grade }));
  };

  const chartOptionsGender = useMemo(
    () => ({
      title: {
        text: "Statistical Gender",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          name: "Gender",
          type: "pie",
          radius: "80%",
          data: parseDataToJSON<TChart>(dataGenders),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }),
    [dataGenders]
  );
  const chartOptionsClassification = useMemo(
    () => ({
      title: {
        text: "Statistical Classification",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          name: "Classification",
          type: "pie",
          radius: "80%",
          data: convertDataClassificationToChartOptions(),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    }),
    [dataClassification]
  );
  return (
    <div className={style.container}>
      <div className={style.wrapChart}>
        <div className={style.chart}>
          {isLoadingGender ? <Spin /> : <EChartsReact option={chartOptionsGender} />}
        </div>
        <div className={style.chart}>
          {isLoadingClassification ? (
            <Spin />
          ) : (
            <EChartsReact option={chartOptionsClassification} />
          )}
        </div>
      </div>
    </div>
  );
}
