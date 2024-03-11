import SearchBar from "./SearchBar";

/**
 * The Header component renders the main header area of the application,
 * including a search bar.
 */
const Header = () => {
  return (
    <div data-testid="header">
      <SearchBar />
    </div>
  );
};

export default Header;
