import styles from "./Table.module.scss";
import PropTypes from "prop-types";
import { colorMap } from "../assets/data";
import { useNavigate } from "react-router-dom";

const TokenTable = (props) => {
  const navigate = useNavigate();
  const handleStatusChange = (e) => {
    const { value } = e.target;
    props.onFilter({ ...props.filters, status: value });
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    props.onFilter({ ...props.filters, type: value });
  };

  const handleSort = (e) => {
    const fieldName = e.target.getAttribute("data-key");
    props.onSort(fieldName);
    if (props.sort === fieldName) {
      props.onSort(`-${fieldName}`);
    } else {
      props.onSort(fieldName);
    }
  };

  const handleBuy = (id) => {
    props.onBuy(id);
  };

  const handleRowClick = (row) => {
    navigate(`${row.id}`);
  };

  return (
    <div className={styles.table}>
      <div>
        <p>Filter by status</p>
        <select onChange={handleStatusChange}>
          <option value={"all"}>All</option>
          <option value={"green"}>Green</option>
          <option value={"yellow"}>Yellow</option>
          <option value={"red"}>Red</option>
        </select>
        <p>Filter by type</p>
        <input type="text" onChange={handleTypeChange} />
      </div>
      <table>
        <thead>
          <tr style={{ cursor: "pointer" }} onClick={handleSort}>
            {props.columns.map((column) => {
              return (
                <th key={column.key} data-key={column.key}>
                  {column.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.items.map((row) => {
            return (
              <tr
                onClick={() => handleRowClick(row)}
                key={row.id}
                style={{
                  backgroundColor: colorMap[row.status],
                }}
              >
                {props.columns.map((column) => (
                  <td key={column.key}>{column.render(row)}</td>
                ))}
                <td>
                  <button onClick={() => handleBuy(row.id)}>Buy</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

TokenTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.string,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
  filters: PropTypes.object,
  onBuy: PropTypes.func,
};

export default TokenTable;
