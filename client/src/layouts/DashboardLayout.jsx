import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  
  const isInstructor = location.pathname.startsWith('/instructor');
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(data);
    };
    fetchUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const menuItems = isAdmin ? [
    { title: 'Dashboard', path: '/admin/dashboard', icon: 'bi-grid-fill' },
    { title: 'Instructors', path: '/admin/instructors', icon: 'bi-people' },
    { title: 'Students', path: '/admin/students', icon: 'bi-person-check' },
    { title: 'Courses', path: '/admin/courses', icon: 'bi-basket-fill' },
  ] : isInstructor ? [
    { title: 'Dashboard', path: '/instructor/dashboard', icon: 'bi-ui-checks-grid' },
    { title: 'My Courses', path: '/instructor/courses', icon: 'bi-basket' },
    { title: 'Quiz', path: '/instructor/quiz', icon: 'bi-question-diamond' },
    { title: 'Earnings', path: '/instructor/earnings', icon: 'bi-graph-up' },
    { title: 'Students', path: '/instructor/students', icon: 'bi-people' },
    { title: 'Orders', path: '/instructor/orders', icon: 'bi-folder-check' },
    { title: 'Reviews', path: '/instructor/reviews', icon: 'bi-star' },
    { title: 'Edit Profile', path: '/instructor/profile', icon: 'bi-pencil-square' },
    { title: 'Payouts', path: '/instructor/payouts', icon: 'bi-wallet2' },
  ] : [
    { title: 'Dashboard', path: '/student/dashboard', icon: 'bi-grid-fill' },
    { title: 'My Subscriptions', path: '/student/subscriptions', icon: 'bi-card-checklist' },
    { title: 'Courses', path: '/student/courses', icon: 'bi-basket-fill' },
    { title: 'Course Resume', path: '/student/resume', icon: 'bi-file-alt' },
    { title: 'Quiz', path: '/student/quiz', icon: 'bi-question-diamond' },
    { title: 'Payment Info', path: '/student/payment', icon: 'bi-credit-card-2-front-fill' },
    { title: 'Wishlist', path: '/student/wishlist', icon: 'bi-cart-check-fill' },
  ];

  if (!profile) return <div className="p-5 text-center">Loading...</div>;

  return (
    <>
      <header className="navbar-light navbar-sticky header-static">
        <nav className="navbar navbar-expand-xl">
          <div className="container-fluid px-3 px-xl-5 gap-3">
            <Link className="navbar-brand" to="/">
              <img className="light-mode-item navbar-brand-item" src="/assets/images/logo.svg" alt="logo" />
            </Link>
            
            {/* Header Right */}
            <div className="ms-auto d-flex align-items-center">
              <div className="dropdown ms-1 ms-lg-0">
                <a className="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                  <img className="avatar-img rounded-circle" src={profile.avatar_url || '/assets/images/avatar/01.jpg'} alt="avatar" />
                </a>
                <ul className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
                  <li className="px-3 mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3">
                        <img className="avatar-img rounded-circle shadow" src={profile.avatar_url || '/assets/images/avatar/01.jpg'} alt="avatar" />
                      </div>
                      <div>
                        <a className="h6" href="#">{profile.full_name}</a>
                        <p className="small m-0">{profile.email}</p>
                      </div>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to={isInstructor ? "/instructor/profile" : "/student/profile"}><i className="bi bi-person fa-fw me-2"></i>Edit Profile</Link></li>
                  <li><button className="dropdown-item bg-danger-soft-hover" onClick={handleSignOut}><i className="bi bi-power fa-fw me-2"></i>Sign Out</button></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Page Banner START */}
        <section className="pt-0">
          <div className="container-fluid px-0">
            <div className="bg-blue h-100px h-md-200px rounded-0" style={{background:"url(/assets/images/pattern/04.png) no-repeat center center", backgroundSize:"cover"}}>
            </div>
          </div>
          <div className="container mt-n4">
            <div className="row">
              <div className="col-12">
                <div className="card bg-transparent card-body p-0">
                  <div className="row d-flex justify-content-between">
                    <div className="col-auto mt-4 mt-md-0">
                      <div className="avatar avatar-xxl mt-n3">
                        <img className="avatar-img rounded-circle border border-white border-3 shadow" src={profile.avatar_url || '/assets/images/avatar/01.jpg'} alt="" />
                      </div>
                    </div>
                    <div className="col d-md-flex justify-content-between align-items-center mt-4">
                      <div>
                        <h1 className="my-1 fs-4">{profile.full_name} <i className="bi bi-patch-check-fill text-info small"></i></h1>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-star text-warning me-2"></i>4.5/5.0</li>
                          <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-user-graduate text-orange me-2"></i>12k Enrolled Students</li>
                          <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0"><i className="fas fa-book text-purple me-2"></i>25 Courses</li>
                        </ul>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        {isInstructor && (
                          <Link to="/instructor/create-course" className="btn btn-success mb-0">Create a course</Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Page content START */}
        <section className="pt-0">
          <div className="container">
            <div className="row">
              {/* Left sidebar START */}
              <div className="col-xl-3">
                <div className="offcanvas-xl offcanvas-end" tabIndex="-1" id="offcanvasSidebar">
                  <div className="offcanvas-header bg-light">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body p-3 p-xl-0">
                    <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
                      <div className="list-group list-group-dark list-group-borderless">
                        {menuItems.map((item, index) => (
                          <Link
                            key={index}
                            className={`list-group-item ${location.pathname === item.path ? 'active' : ''}`}
                            to={item.path}
                          >
                            <i className={`bi ${item.icon} fa-fw me-2`}></i>{item.title}
                          </Link>
                        ))}
                        <button className="list-group-item text-danger bg-danger-soft-hover text-start" onClick={handleSignOut}>
                          <i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main content START */}
              <div className="col-xl-9">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p className="text-center py-4 mb-0">© 2026 LEARN by BuildHQ</p>
        </div>
      </footer>
    </>
  );
};

export default DashboardLayout;
