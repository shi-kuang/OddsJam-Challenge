import React from 'react';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { HeaderProps } from '../types/arbsData'


const Header: React.FC<HeaderProps> = ({ header, handleSort, sortByPercent }) => {
  let icon = sortByPercent === 'desc' ? <FaArrowDown /> : <FaArrowUp />;

  return (
    <th className="header" onClick={handleSort}>
      {header}
      {header === 'PERCENT' && <button className="filter">{icon}</button>}
    </th>
  );
};

export default Header;