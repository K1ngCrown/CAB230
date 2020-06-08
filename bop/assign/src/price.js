import React from 'react';
import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import { useParams } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


function Price() {

    const columns = [
     { headerName: "Name", field: "name", sortable: true, filter:true },
     { headerName: "Symbol", field: "symbol", sortable: true, filter:true },
     { headerName: "Industry", field: "industry", sortable: true, filter:true }
   ];
 
 
   
     
   const [stockData, changeStockData] = useState([]); 
    let {symbol} = useParams();
    const [stockSymbol, changeStockSymbol] = useState(symbol); 
    let url = `http://131.181.190.87:3000/stocks/authed/${stockSymbol}`;
    
    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then(stocks => { changeStockData([stocks])
            console.log(stocks)
      });
      }, [symbol, url]);
     
      return (    
        <div>
          
          <div
            className ="ag-theme-balham"
            style = {{
                height: "100px",
                width: "1605px"
            }}
          >
              <h1>Price History</h1>
              <input value={stockSymbol} onChange={(e) => changeStockSymbol(e.target.value)} placeholder="Search stock symbol..."></input>
            <AgGridReact
                columnDefs={columns}
                rowData={stockData}
                
                
            />
          </div>
        </div>
      );
    }
 
 export default Price;