import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {
  return(
    <div>
      <div className="who">
        {`${name}, your current entry count is...`}
      </div>
      <div className="number">
        {entries}
      </div>
    </div>
  );
}

export default Rank;