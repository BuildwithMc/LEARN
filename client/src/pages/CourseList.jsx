import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabase';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles(full_name, avatar_url)
        `)
        .eq('status', 'published');
        
      if (!error && data) {
        setCourses(data);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <>
      <section className="bg-blue align-items-center d-flex px-0" style={{background: 'url(/assets/images/pattern/04.png) no-repeat center center', backgroundSize: 'cover', height: '200px'}}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="text-white">All Courses</h1>
              <p className="text-white mb-0">Browse and find the perfect course for you!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-5">
        <div className="container">
          <div className="row g-4">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : courses.length === 0 ? (
              <div className="col-12 text-center py-5">
                <h4>No courses available right now.</h4>
              </div>
            ) : (
              courses.map(course => (
                <div className="col-sm-6 col-lg-4 col-xl-3" key={course.id}>
                  <div className="card shadow h-100">
                    <img src={course.thumbnail_url || '/assets/images/courses/4by3/08.jpg'} className="card-img-top" alt="course" style={{height: '200px', objectFit: 'cover'}}/>
                    <div className="card-body pb-0">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="badge bg-success bg-opacity-10 text-success">All Level</span>
                        <a href="#" className="h6 mb-0"><i className="far fa-heart"></i></a>
                      </div>
                      <h5 className="card-title fw-normal">
                        <Link to={`/courses/${course.id}`}>{course.title}</Link>
                      </h5>
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                        <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                        <li className="list-inline-item ms-2 h6 fw-light mb-0">5.0/5.0</li>
                      </ul>
                    </div>
                    <div className="card-footer pt-0 pb-3">
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 fw-light mb-0 text-success">
                          {course.price === 0 ? 'Free' : `$${course.price.toFixed(2)}`}
                        </span>
                        <Link to={`/courses/${course.id}`} className="btn btn-sm btn-primary-soft mb-0">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseList;
