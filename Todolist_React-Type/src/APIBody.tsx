import "./index.css";
import { APIRow } from "./APIRow";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { PublicAPIEntry, PublicAPIs } from "./App";

export interface APIListProp {
  data: PublicAPIs;
}

export const APIBody: React.FC<APIListProp> = ({ data }) => {
  const rows = data.entries
    .slice(0, 100)
    .map((apiData: PublicAPIEntry, count: number) => (
      <APIRow data={apiData} key={uuidv4()} count={count} />
    ));
  return <tbody>{rows}</tbody>;
};
