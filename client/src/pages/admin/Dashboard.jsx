import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fake current courses needing approval or recent status
    setCourses([
      { id: 1, title: 'Building Scalable APIs with GraphQL', instructor: 'Lori Stevens', students: 340, amount: 25478, status: 'Active', image: '/assets/images/courses/4by3/08.jpg' },
      { id: 2, title: 'Bootstrap 5 From Scratch', instructor: 'Dennis Barrett', students: 450, amount: 85478, status: 'Active', image: '/assets/images/courses/4by3/10.jpg' },
      { id: 3, title: 'Graphic Design Masterclass', instructor: 'Billy Vasquez', students: 210, amount: 45478, status: 'Pending', image: '/assets/images/courses/4by3/02.jpg' }
    ]);
  }, []);

  return (
    <>
      <div className="row g-4 mb-4">
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-primary bg-opacity-10 rounded-3">
            <span className="display-6 text-primary mb-0"><i className="fas fa-file-video fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="mb-0 fw-bold">120</h5>
              </div>
              <span className="mb-0 h6 fw-light">Total Courses</span>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-success bg-opacity-10 rounded-3">
            <span className="display-6 text-success mb-0"><i className="fas fa-money-bill-wave fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="mb-0 fw-bold">$2.5M</h5>
              </div>
              <span className="mb-0 h6 fw-light">Total Revenue</span>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
            <span className="display-6 text-info mb-0"><i className="fas fa-users fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="mb-0 fw-bold">15</h5>
                <span className="mb-0 h5">K</span>
              </div>
              <span className="mb-0 h6 fw-light">Total Instructors</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-transparent border rounded-3">
        <div className="card-header bg-transparent border-bottom">
          <h3 className="mb-0">Course Management</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive border-0 rounded-3">
            <table className="table table-dark-gray align-middle p-4 mb-0">
              <thead>
                <tr>
                  <th scope="col" className="border-0 rounded-start">Course Name</th>
                  <th scope="col" className="border-0">Instructor</th>
                  <th scope="col" className="border-0">Enrolled</th>
                  <th scope="col" className="border-0">Status</th>
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
                    <td>{course.instructor}</td>
                    <td>{course.students}</td>
                    <td>
                      {course.status === 'Active' ? (
                        <span className="badge bg-success bg-opacity-10 text-success">Active</span>
                      ) : (
                        <span className="badge bg-warning bg-opacity-10 text-warning">Pending</span>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-info-soft btn-round me-1 mb-0"><i className="far fa-eye"></i></button>
                      {course.status === 'Pending' && (
                        <button className="btn btn-sm btn-success-soft btn-round mb-0"><i className="fas fa-check"></i></button>
                      )}
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
