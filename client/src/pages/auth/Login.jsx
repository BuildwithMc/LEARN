import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        // Fetch user profile to route to correct dashboard
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profile?.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (profile?.role === 'instructor') {
          navigate('/instructor/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
        <div className="container-fluid">
          <div className="row">
            {/* left */}
            <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
              <div className="p-3 p-lg-5">
                {/* Title */}
                <div className="text-center">
                  <h2 className="fw-bold">Welcome to our largest community</h2>
                  <p className="mb-0 h6 fw-light">Let's learn something new today!</p>
                </div>
                {/* SVG Image */}
                <img src="/assets/images/element/02.svg" className="mt-5" alt="" />
                {/* Info */}
                <div className="d-sm-flex mt-5 align-items-center justify-content-center">
                  <p className="mb-0 h6 fw-light ms-0 ms-sm-3">4k+ Students joined us, now it's your turn.</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="col-12 col-lg-6 m-auto">
              <div className="row my-5">
                <div className="col-sm-10 col-xl-8 m-auto">
                  {/* Title */}
                  <span className="mb-0 fs-1">👋</span>
                  <h1 className="fs-2">Login into LEARN!</h1>
                  <p className="lead mb-4">Nice to see you! Please log in with your account.</p>

                  {/* Form START */}
                  <form onSubmit={handleLogin}>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    {/* Email */}
                    <div className="mb-4">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email address *</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill"></i></span>
                        <input 
                          type="email" 
                          className="form-control border-0 bg-light rounded-end ps-1" 
                          placeholder="E-mail" 
                          id="exampleInputEmail1"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {/* Password */}
                    <div className="mb-4">
                      <label htmlFor="inputPassword5" className="form-label">Password *</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock"></i></span>
                        <input 
                          type="password" 
                          className="form-control border-0 bg-light rounded-end ps-1" 
                          placeholder="password" 
                          id="inputPassword5"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {/* Check box */}
                    <div className="mb-4 d-flex justify-content-between">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                      </div>
                      <div className="text-primary-hover">
                        <a href="#" className="text-secondary">
                          <u>Forgot password?</u>
                        </a>
                      </div>
                    </div>
                    {/* Button */}
                    <div className="align-items-center mt-0">
                      <div className="d-grid">
                        <button className="btn btn-primary mb-0" type="submit" disabled={loading}>
                          {loading ? 'Logging in...' : 'Login'}
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* Form END */}

                  {/* Sign up link */}
                  <div className="mt-4 text-center">
                    <span>Don't have an account? <Link to="/register">Signup here</Link></span>
                  </div>
                </div>
              </div> {/* Row END */}
            </div>
          </div> {/* Row END */}
        </div>
      </section>
    </main>
  );
};

export default Login;
