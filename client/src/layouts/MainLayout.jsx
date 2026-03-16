import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      {/* Header START */}
      <header className="navbar-light navbar-sticky header-static">
        <nav className="navbar navbar-expand-xl">
          <div className="container-fluid px-3 px-xl-5">
            {/* Logo */}
            <a className="navbar-brand" href="/">
              <img className="light-mode-item navbar-brand-item" src="/assets/images/logo.svg" alt="logo" />
              <img className="dark-mode-item navbar-brand-item" src="/assets/images/logo-light.svg" alt="logo" />
            </a>
            {/* Nav content will go here */}
            <div className="navbar-collapse w-100 collapse">
              <ul className="navbar-nav navbar-nav-scroll me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
              </ul>
              <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
                 <a href="/login" className="btn btn-primary mb-0">Login</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Header END */}

      <main>
        <Outlet />
      </main>

      {/* Footer START */}
      <footer>
        {/* Footer content goes here */}
        <div className="container">
          <p className="text-center py-4 mb-0">© 2026 LEARN by BuildHQ</p>
        </div>
      </footer>
      {/* Footer END */}
    </>
  )
}

export default MainLayout
