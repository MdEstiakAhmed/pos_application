import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import GlobalFiltering from './Filtering/GlobalFiltering';
import './table.css';

const Table = (props) => {
    const { column, value, handleUpdate, handleDelete, selectedData, setSelectedData } = props;
    const columns = useMemo(() => column, []);
    const data = useMemo(() => value, [value]);

    const tableInstance = useTable({
        columns: columns,
        data: data,
        initialState: {
            pageIndex: 0,
            pageSize: 5
        }
    }, useGlobalFilter, useSortBy, usePagination);

    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize, prepareRow, state, setGlobalFilter } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;



    const handleAllCheckbox = () => {
        let temp = [];
        let checkboxes = document.getElementsByClassName('singleCheckbox');
        if (document.getElementById('allCheckBox').checked) {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
                temp.push(checkboxes[i].value);
            }
            setSelectedData(temp);
        }
        else {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
            setSelectedData([]);
        }
    }

    const handleSingleCheckbox = (id) => {
        if (document.getElementById(id).checked) {
            setSelectedData([...selectedData, id]);
        }
        else {
            setSelectedData(selectedData.filter(item => item !== id));
        }
    }


    return (
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-4"></div>
                <div className="col-4 text-right">
                    <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
            </div>

            <table {...getTableProps()} className="table mt-2">
                <thead className="thead-dark">
                    {
                        headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {
                                    selectedData ?
                                    <th><input type="checkbox" id="allCheckBox" onClick={() => handleAllCheckbox()} /></th> :
                                    null
                                }
                                {
                                    headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>
                                            <div {...column.getSortByToggleProps()}>
                                                {
                                                    column.render('header')
                                                }{' '}
                                                {
                                                    column.isSorted ?
                                                        (column.isSortedDesc ? '⇧' : '⇩') :
                                                        '⇳'
                                                }
                                            </div>
                                        </th>
                                    ))
                                }
                                <th>action</th>
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row, index) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} key={index}>
                                    {
                                        selectedData ?
                                        <td><input type="checkbox" className="singleCheckbox" value={row.cells[0].row.values._id} onClick={() => handleSingleCheckbox(row.cells[0].row.values._id)} id={row.cells[0].row.values._id} /></td> :
                                        null

                                    }
                                    {
                                        row.cells.map((cell) => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {
                                                        cell.render('Cell')
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                    <td>
                                        <button className="btn btn-primary btn-sm m-2" onClick={() => handleUpdate(row.cells[0].row.values)}>update</button>
                                        {
                                            handleDelete ?
                                            <button className="btn btn-primary btn-sm m-2" onClick={() => handleDelete(row.cells[0].row.values._id)}>delete</button> :
                                            null
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div className="row justify-content-between">
                <div className="col-4">
                    <div className="mb-3">
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <select className="p-1 rounded" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                            {
                                [5, 10, 20, 30].map((pageSize) => (
                                    <option value={pageSize} key={pageSize}>{pageSize}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="col-4">
                    <div className="mb-3">
                        <button className="btn btn-outline-primary ml-1" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                        <button className="btn btn-primary ml-1" onClick={() => previousPage()} disabled={!canPreviousPage}>previous</button>
                        <button className="btn btn-primary ml-1" onClick={() => nextPage()} disabled={!canNextPage}>next</button>
                        <button className="btn btn-outline-primary ml-1" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                    </div>
                </div>
            </div>
            {
                pageOptions.map(page => (
                    <button className="btn btn-outline-info m-1" onClick={() => gotoPage(page)}>{page + 1}</button>
                ))
            }
        </div>
    );
};

export default Table;