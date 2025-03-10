import { ThemeSwitcher } from "./theme-switcher";

const Navbar = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-semibold">Sotai</h2>
        <div className="flex items-center gap-4">
          <div className="md:flex md:items-center gap-4">
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Navbar;