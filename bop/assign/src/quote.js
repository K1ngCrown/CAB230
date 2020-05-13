import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import { useParams } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


function Quote() {
    const quote = [
        { headerName: "Name", field: "name", sortable: true, filter:true },
        { headerName: "Symbol", field: "symbol", sortable: true, filter:true },
        { headerName: "Industry", field: "industry", sortable: true, filter:true },
        { headerName: "Open", field: "open", sortable: true, filter:true },
        { headerName: "High", field: "high", sortable: true, filter:true },
        { headerName: "Low", field: "low", sortable: true, filter:true },
        { headerName: "Close", field: "close", sortable: true, filter:true },
        { headerName: "Volumes", field: "volumes", sortable: true, filter:true }
    ]

    const [stockData, changeStockData] = useState([]); 
    let {symbol} = useParams();
    const [stockSymbol, changeStockSymbol] = useState(symbol); 
    let url = `http://131.181.190.87:3000/stocks/${stockSymbol}`;
    
    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then(stocks => { changeStockData([stocks])
      });
      }, [symbol, url]);
   
    
    return (    
      <div>
        <input value={stockSymbol} onChange={(e) => changeStockSymbol(e.target.value)} placeholder="Search stock symbol..."></input>
        <div
          className ="ag-theme-balham"
          style = {{
              height: "600px",
              width: "1000px"
          }}
        >
          <AgGridReact
              columnDefs={quote}
              rowData={stockData}
              pagination={true} 
              paginationPageSize= {1}
          />
        </div>
      </div>
    );
  }

export default Quote;