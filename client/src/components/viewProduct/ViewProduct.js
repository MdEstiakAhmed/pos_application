import React, { useEffect, useState } from 'react';
import {  useHistory, useLocation } from 'react-router-dom';
import Table from '../table/Table';
import {ProductColumn} from './productColumn'
import Alert from '../alert/Alert'

const ViewProduct = () => {
    const history = useHistory();
    const location = useLocation();
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [selectedData, setSelectedData] = useState([]);
    const [alert, setAlert] = useState({success: false, error: false, message: ''});
    useEffect(() => {
        fetch('http://localhost:5000/product', {
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
        history.push(`/upDateProduct/${obj._id}`);
    }

    const handleDelete = (id) => {
        setAlert({success: false, error: false, message: ''});
        fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('jwt'))
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        .then(res => res.json())
        .then(data => {
            if(data.status){
                setAlert({success: true, error: false, message: data.message})
                // setLoader(false);
                setRefresh(!refresh)
            }
            else{
                // setLoader(false);
                setAlert({success: false, error: true, message: data.message});
            }
        })
        .catch(error => {
            // setLoader(false);
            setAlert({success: false, error: true, message: error.message});
        })
    }

    return (
        <>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">All Product</h1>
                </div>
                <div className="container">
                    {
                        location.state && <Alert message={location.state.message} status={true}/>
                    }
                    {
                        alert.success ?
                        <Alert message={alert.message} status={true}/> :
                        alert.error ?
                        <Alert message={alert.message} status={false}/> :
                        null
                    }
                    {
                        data.length > 0 ?
                        <Table column={ProductColumn} value={data} handleUpdate={handleUpdate} handleDelete={handleDelete} selectedData={selectedData} setSelectedData={setSelectedData}/> :
                        <p>no data found</p>
                    }
                </div>
            </main>
        </>
    );
};

export default ViewProduct;