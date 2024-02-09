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

export interface CellInfo {
  cellInfo: any;
  label: string;
}

export interface StateData {
  betPlaced: { cellInfo: boolean; label: string };
  percent: { cellInfo: string; label: string };
  eventDate: { cellInfo: string; label: string };
  event: { cellInfo: any; label: string };
  market: { cellInfo: string; label: string };
  bets: { cellInfo: any; label: string };
  books: { cellInfo: any; label: string };
  oddsJam: { cellInfo: any; label: string };
}
