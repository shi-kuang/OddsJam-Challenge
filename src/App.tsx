import { useState, useEffect } from "react";
import "./App.css";
import { fetchData } from "./api/arbs";
import { ArbitrageData, StateData } from "./types/arbsData";
import Row from './components/row'
import Header from './components/header'

function App() {
  const [displayData, setDisplayData] = useState<StateData[]>([]);
  const [betPlaced, setBetPlaced] = useState<boolean[]>([]);
  const [sortByPercent, setSortByPercent] = useState('desc');
  const headers: string[] = [
    "BET PLACED",
    "PERCENT",
    "EVENT DATE",
    "EVENT",
    "MARKET",
    "BETS",
    "BOOKS",
    "ODDS JAM",
  ];

  const handleBetPlaced = (checked: boolean, index: number) => {
    //create a copy of betPlaced
    const copy = [...betPlaced];
    //reassign index to the opposite of current status
    copy[index] = !checked;
    //update betPlaced array to render on app
    setBetPlaced(copy);
  };

  const handleSort = () => {
    //update sortByPercent based on current icon
    sortByPercent === "asc" || sortByPercent === ''
      ? setSortByPercent('desc')
      : setSortByPercent('asc');
    //assign sortVar based on current icon
    const sortVar = sortByPercent === 'asc' ? 1 : -1;
    //update displayData by sorting based on asc/desc order for percent
    setDisplayData((prevData) =>
      prevData.sort(
        (a, b) => sortVar * (a.percent.cellInfo - b.percent.cellInfo)
      )
    );
  };
  //fetch api data once when page loads
  useEffect(() => {
    const fetchDataFunc = async () => {
      try {
        //call mock API data
        const res = await fetchData();
        //manipulate data for each entry
        const newData = res["arbitrage_data"].map((data: ArbitrageData) => ({
          gameID: { cellInfo: data.game_id },
          betPlaced: { cellInfo: data.bet_placed },
          percent: { cellInfo: data.arb_percent },
          eventDate: { cellInfo: data.start_date},
          event: {
            cellInfo: {
              team: `${data.home_team} vs ${data.away_team}`,
              league: data.league,
              sport: data.sport,
            },
          },
          market: { cellInfo: data.market },
          bets: {
            cellInfo: {
              home: data.best_price_home_name,
              away: data.best_price_away_name,
            },
          },
          books: {
            cellInfo: {
              home: {
                odd: data.best_price_home_odd,
                books: data.best_price_home_odd_books,
              },
              away: {
                odd: data.best_price_away_odd,
                books: data.best_price_away_odd_books,
              },
            },
          },
          oddsJam: {
            cellInfo: {
              home: data.oddsjam_price_home_odd,
              away: data.oddsjam_price_away_odd,
            },
          },
        }));

        //sort and update display data based on ascending order on eventDate
        setDisplayData(
          newData.sort((a, b) => new Date(a.eventDate.cellInfo).getTime() - new Date(b.eventDate.cellInfo).getTime())
          );

        //update bets placed array based on data points
        setBetPlaced(res["arbitrage_data"].map((data) => data.bet_placed));
      } catch (error) {
        //replace with error handling
        console.log(error);
      }
    };

    fetchDataFunc();
  }, []);

  return (
    <div className="container">
      <table className="dataTable">
        <thead>
          <tr className="dataRow">
            {headers.map((header, index) => (
              <Header
                key={`${header}-${index}`}
                header={header}
                handleSort={handleSort}
                sortByPercent={sortByPercent}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((rowData, rowIndex) => (
            <Row
              key={`${rowData.gameID.cellInfo} - ${rowIndex}`}
              rowData={rowData}
              rowIndex={rowIndex}
              betPlaced={betPlaced}
              handleBetPlaced={handleBetPlaced}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;




//     <div className = 'container'>
//     <table className="dataTable">
//       <thead>
//         <tr className="dataRow">
//           {headers.map((header, index) => {
//             //identfy current icon for percent
//             let icon;
//             sortByPercent === "desc"
//               ? (icon = <FaArrowDown />)
//               : (icon = <FaArrowUp />);
//             return (
//               <React.Fragment key={`${header}-${index}`}>
//                 {header === "PERCENT" ? (
//                   //if header is percent, log percent and current icon
//                   <th key={`${header}-${index}`} className="header">
//                     {header}
//                     <button
//                       type="button"
//                       onClick={handleSort}
//                       className="filter"
//                     >
//                       {icon}
//                     </button>
//                   </th>
//                 ) : (
//                   //else, log header
//                   <th key={`${header}-${index}`} className="header">
//                     {header}
//                   </th>
//                 )}
//               </React.Fragment>
//             );
//           })}
//         </tr>
//       </thead>
//       <tbody>
//         {displayData.map((rowData, rowIndex) => (
//           <tr
//             key={`${rowData.gameID.cellInfo} - ${rowIndex}`}
//             className="dataRow"
//           >
//             <td data-cell = 'Bet Placed'>
//               <input
//                 type="checkbox"
//                 checked={betPlaced[rowIndex]}
//                 onChange={() => handleBetPlaced(betPlaced[rowIndex], rowIndex)}
//               />
//             </td>
//             <td data-cell = 'Percent'>{rowData.percent.cellInfo}%</td>
//             <td data-cell = 'Event Date'> {rowData.eventDate.cellInfo.slice(0,10)} @ {new Date(rowData.eventDate.cellInfo).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
// }</td>
//             <td data-cell = 'Event'>
//               <div>{rowData.event.cellInfo.team}</div>
//               <div>
//                 {rowData.event.cellInfo.league} | {rowData.event.cellInfo.sport}
//               </div>
//             </td>
//             <td data-cell = 'Market'>{rowData.market.cellInfo}</td>
//             <td data-cell = 'Bets'>
//               <div>{rowData.bets.cellInfo.home}</div>
//               <div>{rowData.bets.cellInfo.away}</div>
//             </td>
//             <td data-cell = 'Books'>
//               <div>
//                 {rowData.books.cellInfo.home.odd} | [
//                 {rowData.books.cellInfo.home.books.slice(0, 2)}]
//               </div>
//               <div>
//                 {rowData.books.cellInfo.away.odd} | [
//                 {rowData.books.cellInfo.away.books.slice(0, 2)}]
//               </div>
//             </td>
//             <td data-cell = 'Odds Jam'>
//               {rowData.oddsJam.cellInfo.home != null ? (
//                 <div>{rowData.oddsJam.cellInfo.home} </div>
//               ) : (
//                 <div>-</div>
//               )}
//               {rowData.oddsJam.cellInfo.away != null ? (
//                 <div>{rowData.oddsJam.cellInfo.away} </div>
//               ) : (
//                 <div>-</div>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     </div>
//   );