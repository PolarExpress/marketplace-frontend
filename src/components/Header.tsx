// Header component (logo + search bar)
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div data-testid="header">
      <SearchBar />
    </div>
  );
};

export default Header;
