import React, { useState } from 'react';
import csvString from 'csv-string';
import { Uploader, SortableTable } from '..';

const App = () => {
  const [data, setData] = useState([]);

  const handleFileRead = (file) => {
    setData(csvString.parse(file));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card mt-5">
            <div className="card-body">
              <Uploader label="Kies een bestand" onFileRead={handleFileRead} />
              <SortableTable data={data} sortDefault={{ column: 'sur_name', direction: 'asc' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
