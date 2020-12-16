import React, { useEffect, useState } from 'react';
import {  useHistory, useLocation } from 'react-router-dom';
import Table from '../table/Table';
import {InvoiceColumn} from './invoiceColumn'
import Alert from '../alert/Alert'

const ViewInvoice = () => {
    const history = useHistory();
    const location = useLocation();
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [selectedData, setSelectedData] = useState([]);
    const [alert, setAlert] = useState({success: false, error: false, message: ''});

    useEffect(() => {
        fetch('http://localhost:5000/invoice', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('jwt'))
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.status){
                setData(data.data);
            }
            else{
                setData([]);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [refresh])

    const handleUpdate = (obj) => {
        history.push(`/updateInvoice/${obj._id}`);
    }

    return (
        <>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">sales record</h1>
                </div>
                <div className="container">
                    {/* {
                        location.state && <Alert message={location.state.message} status={true}/>
                    } */}
                    {
                        alert.success ?
                        <Alert message={alert.message} status={true}/> :
                        alert.error ?
                        <Alert message={alert.message} status={false}/> :
                        null
                    }
                    {
                        data.length > 0 ?
                        <Table column={InvoiceColumn} value={data} handleUpdate={handleUpdate} handleDelete={false} selectedData={false} setSelectedData={false}/> :
                        <p>no data found</p>
                    }
                </div>
            </main>
        </>
    );
};

export default ViewInvoice;