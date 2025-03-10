import { NavMenu } from "./nav-menu"
import { ThemeSwitcher } from "./theme-switcher"

const Navbar = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-1 justify-between p-4 gap-2">
        <h2 className="text-2xl font-semibold">Sotai</h2>
        <NavMenu />
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default Navbar