import React from 'react'
import { useEffect, useState } from 'react'

const Body = () => {
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState(0);
  let i = 1;
  useEffect(() => {
    fetch('http://localhost:8000/stock')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))

    let avgg = 0;
    data.forEach(row => {
      avgg += row.last;
    })
    setAvg(avgg/10);
  }, [])


  return (
    <div>
      <div className="body_head">
        <div>
        <h2>Best Price to Trade</h2>
        <h1 id="av">{Math.trunc(avg).toLocaleString('en-IN', {
          maximumFractionDigits: 2,
          style: 'currency',
          currency: 'INR'
        })}</h1>
        <h3>Average Last Traded Price</h3>
        </div>

      </div>


      <table>
        <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Last Traded Price</th>
              <th>Buy / Sell Price</th>
              <th>Volume</th>
              <th>Base Unit</th>
            </tr>
        </thead>
        <tbody>
            {data.map(row => {
              // avgg += row.last
              return (<tr>
                <td>{i++}</td>
                <td>{row.name}</td>
                <td>{row.last.toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                  style: 'currency',
                  currency: 'INR'
                })}</td>
                <td>₹{row.sell +' / ₹' +row.buy}</td>
                <td>{row.volume}</td>
                <td>{row.base_unit}</td>
              </tr>)
            })}
        </tbody>
      </table>
      
    </div>
  )
}

export default Body