import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

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

    const aVal = Number(a[col]) || a[col];
    const bVal = Number(b[col]) || b[col];

    if (aVal === bVal) {
      return 0;
    }

    if (asc) {
      return aVal < bVal ? -1 : 1;
    }

    return aVal > bVal ? -1 : 1;
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

  const getChevron = (col) => {
    if (col === sort.col) {
      if (sort.asc) {
        return <FaAngleDown />;
      }
      return <FaAngleUp />;
    }

    return null;
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
                {getChevron(i)}
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
