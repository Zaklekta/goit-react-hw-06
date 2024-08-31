import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import { selectNameFilter } from "../../redux/filtersSlice";
const SearchBox = () => {
  const filterValue = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  return (
    <div className={css.searchBox}>
      <p className={css.text}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={filterValue}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        name="findName"
      />
    </div>
  );
};

export default SearchBox;
