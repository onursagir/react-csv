import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';


const SortableTable = ({ data: inboundData, sortDefault }) => {
  const [heads, ...body] = inboundData;

  const [sort, setSort] = useState(setSortDefault);
  const [data, setData] = useState(body);

  useEffect(() => {
    setSort(setSortDefault);
  }, [inboundData]);

  useEffect(() => {
    setData([...body].sort(sortFunction));
  }, [sort]);

  const handleHeadClick = (i) => {
    if (i === sort.col) {
      setSort({ ...sort, asc: !sort.asc });
    } else {
      setSort({ col: i, asc: true });
    }
  };


  const sortFunction = (a, b) => {
    const { col, asc } = sort;

    if (a[col] === b[col]) {
      return 0;
    }

    if (asc) {
      return a[col] < b[col] ? -1 : 1;
    }

    return a[col] > b[col] ? -1 : 1;
  };

  const setSortDefault = () => {
    if (sortDefault && heads) {
      return {
        col: heads.indexOf(sortDefault.column),
        asc: sortDefault.direction.toLowerCase() === 'asc',
      };
    }

    return { col: 0, asc: true };
  };


  if (heads) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            {heads.map((head, i) => (
              <th
                key={shortId.generate()}
                onClick={() => handleHeadClick(i)}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={shortId.generate()}
            >
              <td>{i}</td>
              {row.map(column => (
                <td
                  key={shortId.generate()}
                >
                  {column}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return null;
};

SortableTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ),
  ).isRequired,
  sortDefault: PropTypes.shape({
    name: PropTypes.string,
    direction: PropTypes.string,
  }),
};

SortableTable.defaultProps = {
  sortDefault: null,
};

export default SortableTable;
