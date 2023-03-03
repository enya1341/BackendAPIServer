import "./index.css";
import React from "react";
import { PublicAPIEntry } from "./App";

export interface APITableBodyProp {
  data: PublicAPIEntry;
  count: number;
}

export const APIRow: React.FC<APITableBodyProp> = ({ data, count }) => {
  return (
    <tr>
      <td>{count}</td>
      <td>{data.API}</td>
      <td>{data.Category}</td>
      <td>{data.Description}</td>
      <td>{data.Link}</td>
    </tr>
  );
};
