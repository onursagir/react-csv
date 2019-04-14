import React, { useState } from 'react';
import { Uploader } from '..';
import csvString from 'csv-string';

const App = () => {
  const [data, setData] = useState();

  const handleFileRead = (file) => {
    setData(csvString.parse(file));
  };

  console.log(data);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card mt-5">
            <div className="card-body">
              <h1>Hallo</h1>
              <Uploader label="Kies een bestand" onFileRead={handleFileRead} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
