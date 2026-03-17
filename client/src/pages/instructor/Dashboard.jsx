import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../utils/supabase';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // In the future, fetch actual courses matching the instructor
    // For now, load some fake initial data
    setCourses([
      { id: 1, title: 'Building Scalable APIs with GraphQL', sales: 34, amount: 25478, period: '9 months', image: '/assets/images/courses/4by3/08.jpg' },
      { id: 2, title: 'Bootstrap 5 From Scratch', sales: 45, amount: 85478, period: '6 months', image: '/assets/images/courses/4by3/10.jpg' },
      { id: 3, title: 'Graphic Design Masterclass', sales: 21, amount: 45478, period: '4 months', image: '/assets/images/courses/4by3/02.jpg' },
      { id: 4, title: 'Learn Invision', sales: 28, amount: 98478, period: '8 months', image: '/assets/images/courses/4by3/04.jpg' },
      { id: 5, title: 'Angular – The Complete Guider', sales: 38, amount: 102478, period: '1 year', image: '/assets/images/courses/4by3/06.jpg' }
    ]);
  }, []);

  return (
    <>
      <div className="row g-4 mb-4">
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-15 rounded-3">
            <span className="display-6 text-warning mb-0"><i className="fas fa-tv fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="mb-0 fw-bold">25</h5>
              </div>
              <span className="mb-0 h6 fw-light">Total Courses</span>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-10 rounded-3">
            <span className="display-6 text-purple mb-0"><i className="fas fa-user-graduate fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="mb-0 fw-bold">25</h5>
                <span className="mb-0 h5">K+</span>
              </div>
              <span className="mb-0 h6 fw-light">Total Students</span>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
            <span className="display-6 text-info mb-0"><i className="fas fa-gem fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="mb-0 fw-bold">12</h5>
                <span className="mb-0 h5">K</span>
              </div>
              <span className="mb-0 h6 fw-light">Enrolled Students</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-body bg-transparent border p-4 h-100 mb-4">
        <div className="row g-4">
          <div className="col-sm-6 col-md-4">
            <span className="badge text-bg-dark">Current Month</span>
            <h4 className="text-primary my-2">$35000</h4>
            <p className="mb-0"><span className="text-success me-1">0.20%<i className="bi bi-arrow-up"></i></span>vs last month</p>
          </div>
          <div className="col-sm-6 col-md-4">
            <span className="badge text-bg-dark">Last Month</span>
            <h4 className="my-2">$28000</h4>
            <p className="mb-0"><span className="text-danger me-1">0.10%<i className="bi bi-arrow-down"></i></span>Then last month</p>
          </div>
        </div>
      </div>

      <div className="card border bg-transparent rounded-3">
        <div className="card-header bg-transparent border-bottom">
          <div className="d-sm-flex justify-content-sm-between align-items-center">
            <h3 className="mb-2 mb-sm-0">Most Selling Courses</h3>
            <Link to="/instructor/courses" className="btn btn-sm btn-primary-soft mb-0">View all</Link>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive border-0 rounded-3">
            <table className="table table-dark-gray align-middle p-4 mb-0">
              <thead>
                <tr>
                  <th scope="col" className="border-0 rounded-start">Course Name</th>
                  <th scope="col" className="border-0">Selling</th>
                  <th scope="col" className="border-0">Amount</th>
                  <th scope="col" className="border-0">Period</th>
                  <th scope="col" className="border-0 rounded-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="w-60px">
                          <img src={course.image} className="rounded" alt="" />
                        </div>
                        <h6 className="mb-0 ms-2 table-responsive-title">	
                          <a href="#">{course.title}</a>
                        </h6>
                      </div>
                    </td>
                    <td>{course.sales}</td>
                    <td>${course.amount.toLocaleString()}</td>
                    <td>
                      <span className="badge bg-primary bg-opacity-10 text-primary">{course.period}</span>
                    </td>
                    <td>
                      <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-0"><i className="far fa-fw fa-edit"></i></a>
                      <button className="btn btn-sm btn-danger-soft btn-round mb-0"><i className="fas fa-fw fa-times"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
