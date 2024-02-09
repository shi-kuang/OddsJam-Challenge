import { useState, useEffect } from "react";
import "./App.css";
import { fetchData } from "./api/arbs";
import { ArbitrageData, StateData } from './types/arbsData'
import { FaArrowDown, FaArrowUp } from "react-icons/fa";


function App () {
  const [displayData, setDisplayData] = useState<StateData[]>([]);
  const [betPlaced, setBetPlaced] = useState<boolean[]>([])
  const [sort, setSort] = useState({icon: 'FaArrowDown'})
  const headers: string[] = [
    "Bet Placed",
    "Percent",
    "Event Date",
    "Event",
    "Market",
    "Bets",
    "Books",
    "Odds Jam",
  ];

  const handleBetPlaced = (checked: boolean,index:number) => {
    const copy = [...betPlaced]
    copy[index] = !checked;
    setBetPlaced(copy)
  }

  const handleSort = ()=> {
    sort.icon === 'FaArrowDown' ? setSort({icon: 'FaArrowUp'}) : setSort({icon: 'FaArrowDown'})
    const sortVar = sort.icon === 'FaArrowDown' ? 1 : -1
    setDisplayData(prevData => prevData.sort((a,b)=> sortVar * (a.percent.cellInfo - b.percent.cellInfo)))
  }

  useEffect(() => {
    const fetchDataFunc = async () => {
      try {
        const res = await fetchData();
        const newData = res["arbitrage_data"].map((data: ArbitrageData) => ({
          betPlaced: { cellInfo: data.bet_placed, label: 'Bet Placed'},
          percent: { cellInfo: data.arb_percent, label: "Percent" },
          eventDate: { cellInfo: data.start_date.slice(0, 10), label: "Event Date" },
          event: { cellInfo: { team: `${data.home_team} vs ${data.away_team}`, league: data.league, sport: data.sport }, label: "Event" },
          market: { cellInfo: data.market, label: "Market" },
          bets: { cellInfo: { home: data.best_price_home_name, away: data.best_price_away_name }, label: "Bets" },
          books: { cellInfo: { home: { odd: data.best_price_home_odd, books: data.best_price_home_odd_books }, away: { odd: data.best_price_away_odd, books: data.best_price_away_odd_books } }, label: "Books" },
          oddsJam: { cellInfo: { home: data.oddsjam_price_home_odd, away: data.oddsjam_price_away_odd }, label: "Odds Jam" }
        }))
         
        setDisplayData(newData.sort((a,b)=> new Date (a.eventDate.cellInfo).getTime() - new Date (b.eventDate.cellInfo).getTime()))      
        
        setBetPlaced(res["arbitrage_data"].map(data=> data.bet_placed))
        console.log(newData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchDataFunc();
  }, [])
  
  return (
    <table>
  <thead>
    <tr>
      {headers.map((header, index) => {
        
        let icon; 
        sort.icon === 'FaArrowDown' ? icon = <FaArrowDown/> : icon = <FaArrowUp/>
        return (
          <>
        {header === 'Percent' 
        ? (<th key = {`${header}-${index}`} style={{ whiteSpace: 'nowrap'}}>Percent <button type='button' onClick = {handleSort}>{icon}</button></th>)
        : (<th key={`${header}-${index}`} style={{ whiteSpace: 'nowrap'}}>{header}</th>)}
        </>
        )
        
        })}
    </tr>
  </thead>
  <tbody>
    {displayData.map((rowData, rowIndex) => (
      <tr key={rowIndex} style={{ whiteSpace: 'nowrap'}}>
        <td><input type ='checkbox' checked = {betPlaced[rowIndex]} onChange={()=>handleBetPlaced(betPlaced[rowIndex],rowIndex)}/></td>
        <td>{rowData.percent.cellInfo}%</td>
        <td>{rowData.eventDate.cellInfo}</td>
        <td>
          <div>{rowData.event.cellInfo.team}</div>
          <div>{rowData.event.cellInfo.league} | {rowData.event.cellInfo.sport}</div>
        </td>
        <td>{rowData.market.cellInfo}</td>
        <td>
          <div>{rowData.bets.cellInfo.home}</div>
          <div>{rowData.bets.cellInfo.away}</div>
        </td>
        <td>
          <div>{rowData.books.cellInfo.home.odd} | [{rowData.books.cellInfo.home.books.slice(0,2)}]</div>
          <div>{rowData.books.cellInfo.away.odd} | [{rowData.books.cellInfo.away.books.slice(0,2)}]</div>
        </td>
        <td>
          {rowData.oddsJam.cellInfo.home != null ? (<div>{rowData.oddsJam.cellInfo.home} </div>) : (<div>-</div>)}
          {rowData.oddsJam.cellInfo.away != null ? (<div>{rowData.oddsJam.cellInfo.away} </div>) : (<div>-</div>)}
        </td>
      </tr>
    ))}
  </tbody>
</table>

  )
  
  
}

export default App;


// {typeof data.cellInfo === 'object' || typeof data.cellInfo === 'boolean'? (
//   <>
//     {data.label === 'Odds Jam' || data.label === 'Bets' ? (
//         <>
//           <div>{data.cellInfo.home}</div>
//           <div>{data.cellInfo.away}</div>
//         </>
//       ) : null}
//     {data.label === 'Books' && (
//       <>
//         <div>{data.cellInfo.home.odd} [{data.cellInfo.home.books.slice(0,2)}]</div>
//         <div>{data.cellInfo.away.odd} [{data.cellInfo.away.books.slice(0,2)}]</div>
//       </>
//     )}
//     {data.label === 'Event' && (
//       <>
//         <div>{data.cellInfo.team}</div>
//         <div>{data.cellInfo.league} | {data.cellInfo.sport}</div>
//       </>
//     )}

//     {data.label === 'Bet Placed' && (
//       <>
//           <input
//             type="checkbox"
//             checked={betPlaced[rowIndex]}
//             onChange={() => betPlacedFunc(betPlaced[rowIndex], rowIndex)}/>                      
//       </>
//     )}
//   </>
// ) : (
//   <div>{data.cellInfo}</div>
// )}