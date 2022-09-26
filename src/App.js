import { useEffect, useMemo, useState } from "react";
import TokenTable from "../src/components/TokenTable";
import { columns, items } from "./assets/data";
import { Route, Routes } from "react-router-dom";
import TokenDetails from "./components/TokenDetails";

const isItemValid = (item, status, type) => {
  if (status === "all" && type === "") {
    return true;
  }
  const statusValid = status === "all" ? true : status === item.status;
  const typeValid = item.type.includes(type);
  return statusValid && typeValid;
};

function App() {
  const [filters, setFilters] = useState({ status: "all", type: "" });
  const [data, setData] = useState([]);
  const [sort, setSort] = useState({ field: "name", order: "ASC" });

  const onFilter = (value) => {
    setFilters(value);
  };

  const onBuy = (id) => {
    alert(id);
  };

  const getOppositeOrder = (order) => {
    return order === "ASC" ? "DESC" : "ASC";
  };

  const onSort = (fieldName) => {
    setSort((prevState) => {
      if (fieldName.startsWith("-")) {
        return { ...prevState, order: getOppositeOrder(prevState.order) };
      }
      return { field: fieldName, order: "ASC" };
    });
  };

  useEffect(() => {
    const filteredData = items.filter((item) => {
      return isItemValid(item, filters.status, filters.type);
    });
    setData(filteredData);
  }, [filters]);

  const sortedData = useMemo(() => {
    const dataCopy = [...data];
    dataCopy.sort(function (a, b) {
      let valueA = a[sort.field];
      let valueB = b[sort.field];
      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toUpperCase();
        valueB = valueB.toUpperCase();
      }
      if (valueA < valueB) {
        return sort.order === "ASC" ? -1 : 1;
      } else if (valueA > valueB) {
        return sort.order === "ASC" ? 1 : -1;
      } else {
        return 0;
      }
    });
    return dataCopy;
  }, [sort, data]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <TokenTable
              items={sortedData}
              columns={columns}
              filters={filters}
              onFilter={onFilter}
              sort={sort.field}
              onSort={onSort}
              onBuy={onBuy}
            />
          }
        />
        <Route path="/:id" element={<TokenDetails />} />
      </Routes>
    </div>
  );
}

export default App;
