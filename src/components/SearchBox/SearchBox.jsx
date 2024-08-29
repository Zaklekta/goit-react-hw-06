import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilterValue } from "../../redux/filterSlice";
const SearchBox = () => {
  const filterValue = useSelector((state) => state.filter.filterValue);
  const dispatch = useDispatch();

  const handleFilter = (value) => {
    const action = setFilterValue(value);
    dispatch(action);
  };

  return (
    <div className={css.searchBox}>
      <p className={css.text}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={filterValue}
        onChange={(e) => handleFilter(e.target.value)}
        name="findName"
      />
    </div>
  );
};

export default SearchBox;
