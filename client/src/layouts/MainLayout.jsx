import { Outlet, Link } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      {/* Header START */}
      <header className="navbar-light navbar-sticky header-static">
        {/* Nav START */}
        <nav className="navbar navbar-expand-xl">
          <div className="container-fluid px-3 px-xl-5">
            {/* Logo START */}
            <Link className="navbar-brand" to="/">
              <img className="light-mode-item navbar-brand-item" src="/assets/images/logo.svg" alt="logo" />
              <img className="dark-mode-item navbar-brand-item" src="/assets/images/logo-light.svg" alt="logo" />
            </Link>
            {/* Logo END */}

            {/* Responsive navbar toggler */}
            <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-animation">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* Main navbar START */}
            <div className="navbar-collapse w-100 collapse" id="navbarCollapse">
              {/* Nav Main menu START */}
              <ul className="navbar-nav navbar-nav-scroll me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/courses">Courses</Link>
                </li>
              </ul>
              {/* Nav Main menu END */}

              {/* Nav Search START */}
              <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
                <div className="nav-item w-100">
                  <form className="position-relative">
                    <input className="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search" />
                    <button className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset" type="submit">
                      <i className="fas fa-search fs-6 "></i>
                    </button>
                  </form>
                </div>
              </div>
              {/* Nav Search END */}
            </div>
            {/* Main navbar END */}

            {/* Profile START */}
            <div className="dropdown ms-1 ms-lg-0">
               <Link to="/login" className="btn btn-sm btn-primary mb-0">Login</Link>
            </div>
            {/* Profile START */}
          </div>
        </nav>
        {/* Nav END */}
      </header>
      {/* Header END */}

      <main>
        <Outlet />
      </main>

      {/* Footer START */}
      <footer className="pt-5 bg-light">
        <div className="container">
          {/* Row START */}
          <div className="row g-4">

            {/* Widget 1 START */}
            <div className="col-lg-3">
              {/* logo */}
              <Link className="me-0" to="/">
                <img className="light-mode-item h-40px" src="/assets/images/logo.svg" alt="logo" />
                <img className="dark-mode-item h-40px" src="/assets/images/logo-light.svg" alt="logo" />
              </Link>
              <p className="my-3">LEARN education theme, built specifically for the education centers which is dedicated to teaching and involve learners.</p>
              {/* Social media icon */}
              <ul className="list-inline mb-0 mt-3">
                <li className="list-inline-item"> <a className="btn btn-white btn-sm shadow px-2 text-facebook" href="#"><i className="fab fa-fw fa-facebook-f"></i></a> </li>
                <li className="list-inline-item"> <a className="btn btn-white btn-sm shadow px-2 text-instagram" href="#"><i className="fab fa-fw fa-instagram"></i></a> </li>
                <li className="list-inline-item"> <a className="btn btn-white btn-sm shadow px-2 text-twitter" href="#"><i className="fab fa-fw fa-twitter"></i></a> </li>
                <li className="list-inline-item"> <a className="btn btn-white btn-sm shadow px-2 text-linkedin" href="#"><i className="fab fa-fw fa-linkedin-in"></i></a> </li>
              </ul>
            </div>
            {/* Widget 1 END */}

            {/* Widget 2 START */}
            <div className="col-lg-6">
              <div className="row g-4">
                {/* Link block */}
                <div className="col-6 col-md-4">
                  <h5 className="mb-2 mb-md-4">Company</h5>
                  <ul className="nav flex-column">
                    <li className="nav-item"><a className="nav-link" href="#">About us</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Contact us</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">News and Blogs</a></li>
                  </ul>
                </div>
                        
                {/* Link block */}
                <div className="col-6 col-md-4">
                  <h5 className="mb-2 mb-md-4">Community</h5>
                  <ul className="nav flex-column">
                    <li className="nav-item"><a className="nav-link" href="#">Documentation</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Faq</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Forum</a></li>
                  </ul>
                </div>

                {/* Link block */}
                <div className="col-6 col-md-4">
                  <h5 className="mb-2 mb-md-4">Teaching</h5>
                  <ul className="nav flex-column">
                    <li className="nav-item"><a className="nav-link" href="#">Become a teacher</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">How to guide</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Terms &amp; Conditions</a></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Widget 2 END */}

            {/* Widget 3 START */}
            <div className="col-lg-3">
              <h5 className="mb-2 mb-md-4">Contact</h5>
              {/* Time */}
              <p className="mb-2">
                Toll free:<span className="h6 fw-light ms-2">+1234 568 963</span>
                <span className="d-block small">(9:AM to 8:PM IST)</span>
              </p>

              <p className="mb-0">Email:<span className="h6 fw-light ms-2">support@buildhq.com</span></p>
            </div> 
            {/* Widget 3 END */}
          </div>{/* Row END */}

          {/* Divider */}
          <hr className="mt-4 mb-0" />

          {/* Bottom footer */}
          <div className="py-3">
            <div className="container px-0">
              <div className="d-lg-flex justify-content-between align-items-center py-3 text-center text-md-left">
                {/* copyright text */}
                <div className="text-body text-primary-hover"> Copyrights ©2026 LEARN by BuildHQ</div>
                {/* copyright links*/}
                <div className="justify-content-center mt-3 mt-lg-0">
                  <ul className="nav list-inline justify-content-center mb-0">
                    <li className="list-inline-item"><a className="nav-link" href="#">Terms of use</a></li>
                    <li className="list-inline-item"><a className="nav-link pe-0" href="#">Privacy policy</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer END */}
    </>
  )
}

export default MainLayout

