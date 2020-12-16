import React from 'react';

const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
    return (
        <span style={{font: '10px'}}>
            <input className="border border-info rounded mt-2" style={{width: '100px', fontSize: '15px'}} value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} placeholder="search..."/>
        </span>
    );
};

export default ColumnFilter;