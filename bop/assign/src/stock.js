import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


// useEffect => call the request on page load
// useState => store / track variable


function Stock() {

   const columns = [
    { headerName: "Name", field: "name", sortable: true, filter:true },
    { headerName: "Symbol", field: "symbol", sortable: true, filter:true },
    { headerName: "Industry", field: "industry", sortable: true, filter:true }
  ];


  const [stockData, changeStockData] = useState([]);
    
    
    useEffect(() => {
        fetch("http://131.181.190.87:3000/stocks/symbols")
              .then((response) => { response.json()
                .then(stockData => { changeStockData(stockData)
                })
              });
    }, []);
    
    return (    
      <div
        className ="ag-theme-balham"
        style = {{
            height: "300px",
            width: "800px"
        }}
      >
        <AgGridReact
            columnDefs={columns}
            rowData={stockData}
            pagination={true} 
            paginationPageSize= {8}
        />
      </div>
    );
}

export default Stock;