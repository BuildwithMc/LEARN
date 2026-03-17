import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fake current enrolled courses
    setCourses([
      { id: 1, title: 'Building Scalable APIs with GraphQL', progress: 85, lectures: 42, completedLectures: 35, image: '/assets/images/courses/4by3/08.jpg' },
      { id: 2, title: 'Bootstrap 5 From Scratch', progress: 40, lectures: 25, completedLectures: 10, image: '/assets/images/courses/4by3/10.jpg' },
      { id: 3, title: 'Graphic Design Masterclass', progress: 10, lectures: 56, completedLectures: 5, image: '/assets/images/courses/4by3/02.jpg' }
    ]);
  }, []);

  return (
    <>
      <div className="row g-4 mb-4">
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-primary bg-opacity-10 rounded-3">
            <span className="display-6 text-primary mb-0"><i className="fas fa-tv fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="mb-0 fw-bold">9</h5>
              </div>
              <span className="mb-0 h6 fw-light">Total Courses</span>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-success bg-opacity-10 rounded-3">
            <span className="display-6 text-success mb-0"><i className="fas fa-check-circle fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="mb-0 fw-bold">52</h5>
              </div>
              <span className="mb-0 h6 fw-light">Completed Lessons</span>
            </div>
          </div>
        </div>
        {/* Counter item */}
        <div className="col-sm-6 col-lg-4">
          <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
            <span className="display-6 text-info mb-0"><i className="fas fa-certificate fa-fw"></i></span>
            <div className="ms-4">
              <div className="d-flex">
                <h5 className="mb-0 fw-bold">3</h5>
              </div>
              <span className="mb-0 h6 fw-light">Achieved Certificates</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-transparent border rounded-3">
        <div className="card-header bg-transparent border-bottom">
          <h3 className="mb-0">My Courses</h3>
        </div>
        <div className="card-body">
          <div className="row g-4">
            {courses.map(course => (
              <div className="col-sm-6 col-lg-4" key={course.id}>
                <div className="card shadow h-100">
                  {/* Image */}
                  <img src={course.image} className="card-img-top" alt="course image" />
                  <div className="card-body pb-0">
                    <div className="d-flex justify-content-between mb-2">
                      <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                    </div>
                    {/* Title */}
                    <h5 className="card-title fw-normal"><a href="#">{course.title}</a></h5>
                    
                    {/* Progress bar */}
                    <div className="overflow-hidden mt-3">
                      <h6 className="mb-1 text-end">{course.progress}%</h6>
                      <div className="progress progress-sm bg-primary bg-opacity-10">
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${course.progress}%` }} aria-valuenow={course.progress} aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                  {/* Card footer */}
                  <div className="card-footer pt-0 pb-3">
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span className="h6 fw-light mb-0"><i className="fas fa-play text-danger me-2"></i>{course.completedLectures} / {course.lectures}</span>
                      <a href="#" className="btn btn-sm btn-primary-soft mb-0">Continue</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
