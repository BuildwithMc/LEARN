import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <>
      {/* Header START */}
      <header className="navbar-light navbar-sticky header-static">
        <nav className="navbar navbar-expand-xl">
          <div className="container-fluid px-3 px-xl-5">
            <a className="navbar-brand" href="/">
              <img className="light-mode-item navbar-brand-item" src="/assets/images/logo.svg" alt="logo" />
              <img className="dark-mode-item navbar-brand-item" src="/assets/images/logo-light.svg" alt="logo" />
            </a>
          </div>
        </nav>
      </header>
      {/* Header END */}

      <main>
        <section className="pt-0">
          <div className="container-fluid px-0">
            <div className="bg-blue h-100px align-items-center d-flex justify-content-center">
              <h1 className="text-white">Dashboard</h1>
            </div>
          </div>
          <div className="container mt-n4">
            <div className="row">
              <div className="col-12">
                <div className="card shadow p-4 z-index-9">
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="mb-0">Logged In</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-4">
          <div className="container">
            <div className="row">
              {/* Sidebar would go here */}
              <div className="col-xl-3">
                <div className="card card-body shadow">
                  <h6 className="mb-0">Sidebar Menu</h6>
                  <ul className="nav flex-column my-3">
                     <li className="nav-item">
                        <a className="nav-link" href="#">Profile</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link text-danger" href="#">Logout</a>
                     </li>
                  </ul>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="col-xl-9">
                 <Outlet />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer START */}
      <footer>
        <div className="container">
          <p className="text-center py-4 mb-0">© 2026 LEARN by BuildHQ</p>
        </div>
      </footer>
      {/* Footer END */}
    </>
  )
}

export default DashboardLayout
