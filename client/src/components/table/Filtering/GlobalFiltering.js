import React from 'react';
import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

const GlobalFilter = ({ filter, setFilter}) => {
    const [value, setValue] = useState(filter);

    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, 1000);

    return (
        <span>
            Search: {' '}
            <input className="border border-info rounded p-1" value={value || ''} onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
            }}/>
        </span>
    );
};

export default GlobalFilter;