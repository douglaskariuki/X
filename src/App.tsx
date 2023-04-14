import React, { useEffect, useState } from 'react';
import './App.css';
import * as d3 from 'd3';

function App() {
  const [data, setData] = useState({
    rows: [],
    cols: []
  });
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    const data = getData(5, 6)
    setData(data)
    createMatrix()
  }, [])


  const {rows, cols} = data;

  function createMatrix() {
    rows.map((d) => {
      cols.map((v) => {
        var grid = {
          x: d, 
          y: v,
          product: d * v
        }

        setMatrix([grid])
      })
    })
  }

  return (
    <div className="App">
      <h1>
        The Multiplication Grid
      </h1>

      <div className='grid'>
        <Grid>
          <TopRow 
            data={rows}
          />
          <LeftCol 
            data={cols}
          />
        </Grid>
      </div>
    </div>
  );
}

function Grid({children}) {
  const [dimensions] = useState(createChartDimensions)

  return (
    <svg className="Chart" width={dimensions.width} height={dimensions.height}>
      <g transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}>
        {children}
      </g>
    </svg>
  )
}

function TopRow({data}) {
  return (
    <g className='Top-row'>
      <Numbers 
        data={data}
        orient="x"
      />
    </g>
  )
}

function LeftCol({data}) {
  return (
    <g className='Left-col'>
      <Numbers 
        data={data}
        orient="y"
      />
    </g>
  )
}

function Numbers({data, orient}) {
  if (orient === "y") {
    return (
      data.map((d, i) => (
        <text 
          transform='translate(-30, 60)'
          y={i * 60}
        >{d}</text>
      ))
    )
  }

  return (
    data.map((d, i) => (
      <text 
        transform='translate(0, 0)'
        x={i * 60 + 20}
      >{d}</text>
    ))
  )
  
}

function createChartDimensions() {
  let dimensions = {
    width: window.innerWidth * 0.8,
    height: window.innerWidth * 0.8,
    margin: {
        top: 80,
        right: 80,
        bottom: 80,
        left: 80,
    },
  }

  return {
      ...dimensions,
      boundedWidth: dimensions.width - dimensions.margin.left - dimensions.margin.right,
      boundedHeight: dimensions.height - dimensions.margin.top - dimensions.margin.bottom
  }
}

function getData(horizontal: number, vertical: number) {
  let rows = Array.from(Array(horizontal), (_, i) => i + 1)
  let cols = Array.from(Array(vertical), (_, i) => i + 1)
  return {rows, cols}
}

export default App;
