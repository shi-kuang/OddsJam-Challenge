import React from "react";
import { RowProps } from '../types/arbsData'

const Row: React.FC<RowProps> = ({ rowData, rowIndex, betPlaced, handleBetPlaced }) => {
  return (
    <tr key={`${rowData.gameID.cellInfo}-${rowIndex}`} className="dataRow">
      <td data-cell="Bet Placed">
        <input
          type="checkbox"
          checked={betPlaced[rowIndex]}
          onChange={() => handleBetPlaced(betPlaced[rowIndex], rowIndex)}
        />
      </td>
      <td data-cell="Percent">{rowData.percent.cellInfo}%</td>
      <td data-cell="Event Date">
        {" "}
        {rowData.eventDate.cellInfo.slice(0, 10)} @{" "}
        {new Date(rowData.eventDate.cellInfo).toLocaleString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </td>
      <td data-cell="Event">
        <div>{rowData.event.cellInfo.team}</div>
        <div>
          {rowData.event.cellInfo.league} | {rowData.event.cellInfo.sport}
        </div>
      </td>
      <td data-cell="Market">{rowData.market.cellInfo}</td>
      <td data-cell="Bets">
        <div>{rowData.bets.cellInfo.home}</div>
        <div>{rowData.bets.cellInfo.away}</div>
      </td>
      <td data-cell="Books">
        <div>
          {rowData.books.cellInfo.home.odd} | [
          {rowData.books.cellInfo.home.books.slice(0, 2)}]
        </div>
        <div>
          {rowData.books.cellInfo.away.odd} | [
          {rowData.books.cellInfo.away.books.slice(0, 2)}]
        </div>
      </td>
      <td data-cell="Odds Jam">
        {rowData.oddsJam.cellInfo.home != null ? (
          <div>{rowData.oddsJam.cellInfo.home} </div>
        ) : (
          <div>-</div>
        )}
        {rowData.oddsJam.cellInfo.away != null ? (
          <div>{rowData.oddsJam.cellInfo.away} </div>
        ) : (
          <div>-</div>
        )}
      </td>
    </tr>
  );
};

export default Row;
