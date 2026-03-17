import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabase';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data?.user) {
        if (role === 'instructor') {
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
              </div>
            </div>

            {/* Right */}
            <div className="col-12 col-lg-6 m-auto">
              <div className="row my-5">
                <div className="col-sm-10 col-xl-8 m-auto">
                  {/* Title */}
                  <img src="/assets/images/element/03.svg" className="h-40px mb-2" alt="" />
                  <h2>Sign up for your account!</h2>
                  <p className="lead mb-4">Nice to see you! Please Sign up with your account.</p>
                
                  {/* Form START */}
                  <form onSubmit={handleRegister}>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    {/* Full Name */}
                    <div className="mb-4">
                      <label htmlFor="inputFullName" className="form-label">Full Name *</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-person-fill"></i></span>
                        <input 
                          type="text" 
                          className="form-control border-0 bg-light rounded-end ps-1" 
                          placeholder="Full Name" 
                          id="inputFullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
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
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="inputPassword5" className="form-label">Password *</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock"></i></span>
                          <input 
                            type="password" 
                            className="form-control border-0 bg-light rounded-end ps-1" 
                            placeholder="*********" 
                            id="inputPassword5"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      {/* Confirm Password */}
                      <div className="col-md-6 mb-4">
                        <label htmlFor="inputPassword6" className="form-label">Confirm Password *</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock"></i></span>
                          <input 
                            type="password" 
                            className="form-control border-0 bg-light rounded-end ps-1" 
                            placeholder="*********" 
                            id="inputPassword6"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    {/* Role Selection */}
                    <div className="mb-4">
                      <label className="form-label">Join as a: *</label>
                      <div className="d-flex gap-4">
                        <div className="form-check radio-bg-light">
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="roleSelection" 
                            id="roleStudent" 
                            value="student" 
                            checked={role === 'student'}
                            onChange={(e) => setRole(e.target.value)} 
                          />
                          <label className="form-check-label" htmlFor="roleStudent">
                            Student (Learner)
                          </label>
                        </div>
                        <div className="form-check radio-bg-light">
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="roleSelection" 
                            id="roleInstructor" 
                            value="instructor" 
                            checked={role === 'instructor'}
                            onChange={(e) => setRole(e.target.value)} 
                          />
                          <label className="form-check-label" htmlFor="roleInstructor">
                            Instructor (Creator)
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Check box */}
                    <div className="mb-4">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="checkbox-1" required />
                        <label className="form-check-label" htmlFor="checkbox-1">By signing up, you agree to the <a href="#">terms of service</a></label>
                      </div>
                    </div>
                    {/* Button */}
                    <div className="align-items-center mt-0">
                      <div className="d-grid">
                        <button className="btn btn-primary mb-0" type="submit" disabled={loading}>
                          {loading ? 'Creating account...' : 'Sign Up'}
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* Form END */}

                  {/* Sign up link */}
                  <div className="mt-4 text-center">
                    <span>Already have an account? <Link to="/login">Sign in here</Link></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
