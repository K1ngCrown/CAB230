import React from 'react';
import { useState, useEffect,useRef } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

// useEffect => call the request on page load
// useState => store / track variable


function Stock() {



   const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Industry", field: "industry" }
  ];

  const [stockData, changeStockData] = useState([]);
    
    
    useEffect(() => {
        var myURL = "http://131.181.190.87:3000/stocks/symbols";
        var myRequest = new Request(myURL);
        fetch(myURL)
              .then((response) => {
                response.json().then(data => {
                  changeStockData(data)
                })
              });
    }, []);

    

    return (    
      <div
        className ="ag-theme-balhma"
        style = {{
            height: "300px",
            width: "600px"
        }}
      >
        <AgGridReact
            columnDefs={columns}
            rowData={stockData}
        />
      </div>
    );
}

export default Stock;