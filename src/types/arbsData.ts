export interface ArbitrageData {
  market: string;
  is_live: boolean;
  game_id: string;
  sport: string;
  league: string;
  home_team: string;
  away_team: string;
  start_date: string;
  best_price_home_name: string;
  best_price_home_odd: number;
  best_price_home_odd_books: string[];
  best_price_away_name: string;
  best_price_away_odd: number;
  best_price_away_odd_books: string[];
  oddsjam_price_home_odd: number | null;
  oddsjam_price_away_odd: number | null;
  type: string;
  arb_percent: number;
  bet_placed: boolean;
}

export interface StateData {
  gameID: { cellInfo: string };
  betPlaced: { cellInfo: boolean };
  percent: { cellInfo: number };
  eventDate: { cellInfo: string };
  event: { cellInfo: any };
  market: { cellInfo: string };
  bets: { cellInfo: any };
  books: { cellInfo: any };
  oddsJam: { cellInfo: any };
}

export interface HeaderProps {
  header: string;
  handleSort: () => void;
  sortByPercent: string;
}

export interface RowProps {
  rowData: {
    gameID: { cellInfo: string };
    percent: { cellInfo: number };
    eventDate: { cellInfo: string };
    event: { cellInfo: { team: string; league: string; sport: string } };
    market: { cellInfo: string };
    bets: { cellInfo: { home: string; away: string } };
    books: {
      cellInfo: {
        home: { odd: string; books: string[] };
        away: { odd: string; books: string[] };
      };
    };
    oddsJam: { cellInfo: { home: string | null; away: string | null } };
  };
  rowIndex: number;
  betPlaced: boolean[];
  handleBetPlaced: (checked: boolean, index: number) => void;
}
