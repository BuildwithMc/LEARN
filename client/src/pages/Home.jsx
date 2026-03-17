import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const popularCourses = [
    { id: 1, title: 'Sketch from A to Z: for app designer', level: 'All level', levelColor: 'purple', duration: '12h 56m', lectures: 15, rating: 4.0, image: '/assets/images/courses/4by3/08.jpg' },
    { id: 2, title: 'Graphic Design Masterclass', level: 'Beginner', levelColor: 'success', duration: '9h 56m', lectures: 65, rating: 4.5, image: '/assets/images/courses/4by3/02.jpg' },
    { id: 3, title: 'Create a Design System in Figma', level: 'Beginner', levelColor: 'success', duration: '5h 56m', lectures: 32, rating: 4.5, image: '/assets/images/courses/4by3/03.jpg' },
    { id: 4, title: 'Deep Learning with React-Native', level: 'Beginner', levelColor: 'success', duration: '18h 56m', lectures: 99, rating: 4.0, image: '/assets/images/courses/4by3/07.jpg' },
  ];

  const trendingCourses = [
    { id: 5, title: 'The complete Digital Marketing Course - 8 Course in 1', category: 'Design', price: 'Free', rating: 4.5, students: 6500, time: '6h 56m', lectures: 82, image: '/assets/images/courses/4by3/14.jpg', author: 'Larry Lawson', avatar: '/assets/images/avatar/10.jpg' },
    { id: 6, title: 'Angular – The Complete Guide (2026 Edition)', category: 'Development', price: '$255', rating: 4.0, students: 4500, time: '12h 45m', lectures: 65, image: '/assets/images/courses/4by3/15.jpg', author: 'Billy Vasquez', avatar: '/assets/images/avatar/04.jpg' },
  ];

  return (
    <>
      {/* =======================
      Main Banner START */}
      <section className="position-relative overflow-hidden pt-5 pt-lg-3">
        {/* SVG START */}
        <figure className="position-absolute top-50 start-0 translate-middle-y ms-n7 d-none d-xxl-block">
          <svg className="rotate-74 fill-danger opacity-1" width="200" height="200">
            <circle cx="180.4" cy="15.5" r="7.7" />
            <path d="m159.9 22.4c-3.8 0-6.9-3.1-6.9-6.9s3.1-6.9 6.9-6.9 6.9 3.1 6.9 6.9-3.1 6.9-6.9 6.9z" />
            <circle cx="118.9" cy="15.5" r="5.4" />
          </svg>
        </figure>
        {/* SVG END */}

        {/* Content START */}
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left content START */}
            <div className="col-lg-5 col-xl-6 position-relative z-index-1 text-center text-lg-start mb-7 mb-sm-0">
              <h1 className="mb-0 display-6">Limitless learning at your
                <span className="position-relative"> fingertips</span>
              </h1>
              
              <p className="my-4 lead">Online learning and teaching marketplace with 5K+ courses & 10M students. Taught by experts to help you acquire new skills.</p>
              
              <ul className="list-inline position-relative justify-content-center justify-content-lg-start mb-4">
                <li className="list-inline-item me-2"> <i className="bi bi-patch-check-fill h6 me-1"></i>Learn with experts</li>
                <li className="list-inline-item me-2"> <i className="bi bi-patch-check-fill h6 me-1"></i>Get certificate</li>
                <li className="list-inline-item"> <i className="bi bi-patch-check-fill h6 me-1"></i>Get membership</li>
              </ul>

              <div className="d-sm-flex align-items-center justify-content-center justify-content-lg-start">
                <Link to="/register" className="btn btn-lg btn-danger-soft me-2 mb-4 mb-sm-0">Get Started</Link>
                <div className="d-flex align-items-center justify-content-center py-2 ms-0 ms-sm-4">
                  <a href="#" className="btn btn-round btn-primary-shadow mb-0 overflow-visible me-7"> 
                    <i className="fas fa-play"></i>
                  </a>
                  <h6 className="mb-0 ms-3 fw-normal">Watch video</h6>
                </div>
              </div>
            </div>
            {/* Left content END */}

            {/* Right content START */}
            <div className="col-lg-7 col-xl-6 text-center position-relative">
              {/* Image */}
              <div className="position-relative ms-sm-4">
                <img src="/assets/images/element/07.png" alt="Hero representation" />
              </div>
            </div>
            {/* Right content END */}
          </div>
        </div>
        {/* Content END */}
      </section>
      {/* =======================
      Main Banner END */}

      {/* =======================
      Counter START */}
      <section className="py-0 py-xl-5">
        <div className="container">
          <div className="row g-4">
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-15 rounded-3">
                <span className="display-6 lh-1 text-warning mb-0"><i className="fas fa-tv"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="mb-0 fw-bold">10</h5>
                    <span className="mb-0 h5">K</span>
                  </div>
                  <p className="mb-0">Online Courses</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-blue bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-blue mb-0"><i className="fas fa-user-tie"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="mb-0 fw-bold">200</h5>
                    <span className="mb-0 h5">+</span>
                  </div>
                  <p className="mb-0">Expert Tutors</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-purple mb-0"><i className="fas fa-user-graduate"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="mb-0 fw-bold">60</h5>
                    <span className="mb-0 h5">K+</span>
                  </div>
                  <p className="mb-0">Online Students</p>
                </div>
              </div>
            </div>
            {/* Counter item */}
            <div className="col-sm-6 col-xl-3">
              <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
                <span className="display-6 lh-1 text-info mb-0"><i className="bi bi-patch-check-fill"></i></span>
                <div className="ms-4 h6 fw-normal mb-0">
                  <div className="d-flex">
                    <h5 className="mb-0 fw-bold">6</h5>
                    <span className="mb-0 h5">K+</span>
                  </div>
                  <p className="mb-0">Certified Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =======================
      Counter END */}

      {/* =======================
      Popular course START */}
      <section>
        <div className="container">
          {/* Title */}
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fs-1">Most Popular Courses</h2>
              <p className="mb-0">Choose from hundreds of courses from specialist organizations</p>
            </div>
          </div>

          {/* Content START */}
          <div className="row g-4">
            {popularCourses.map((course) => (
              <div className="col-sm-6 col-lg-4 col-xl-3" key={course.id}>
                <div className="card shadow h-100">
                  {/* Image */}
                  <img src={course.image} className="card-img-top" alt="course image" />
                  {/* Card body */}
                  <div className="card-body pb-0">
                    <div className="d-flex justify-content-between mb-2">
                      <a href="#" className={`badge bg-${course.levelColor} bg-opacity-10 text-${course.levelColor}`}>{course.level}</a>
                      <a href="#" className="h6 mb-0"><i className="far fa-heart"></i></a>
                    </div>
                    {/* Title */}
                    <h5 className="card-title fw-normal"><a href="#">{course.title}</a></h5>
                    {/* Rating star */}
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                      <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                      <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                      <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                      <li className="list-inline-item me-0 small"><i className={course.rating === 5 ? "fas fa-star text-warning" : "fas fa-star-half-alt text-warning"}></i></li>
                      <li className="list-inline-item ms-2 h6 fw-light mb-0">{course.rating.toFixed(1)}/5.0</li>
                    </ul>
                  </div>
                  {/* Card footer */}
                  <div className="card-footer pt-0 pb-3">
                    <hr />
                    <div className="d-flex justify-content-between">
                      <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2"></i>{course.duration}</span>
                      <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2"></i>{course.lectures} lectures</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Content END */}
        </div>
      </section>
      {/* =======================
      Popular course END */}

      {/* =======================
      Action box START */}
      <section className="pt-0 pt-lg-5">
        <div className="container position-relative">
          <div className="row">
            <div className="col-12">
              <div className="bg-info p-4 p-sm-5 rounded-3">
                <div className="row align-items-center position-relative">
                  <div className="col-11 mx-auto position-relative">
                    <div className="row align-items-center">
                      {/* Title */}
                      <div className="col-lg-7">
                        <h3 className="text-white">Become an Instructor!</h3>
                        <p className="text-white mb-3 mb-lg-0">Speedily say has suitable disposal add boy. On forth doubt miles of child. Exercise joy man children rejoiced. Yet uncommonly his ten who diminution astonished.</p>
                      </div>
                      {/* Content and input */}
                      <div className="col-lg-5 text-lg-end">
                        <Link to="/register" className="btn btn-outline-warning mb-0">Start Teaching Today</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =======================
      Action box END */}

      {/* =======================
      Trending courses START */}
      <section className="pb-5 pt-0 pt-lg-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fs-1">Our Trending Courses</h2>
              <p className="mb-0">Check out most 🔥 courses in the market</p>
            </div>
          </div>
          <div className="row">
            {trendingCourses.map((course) => (
              <div className="col-sm-6 col-lg-4" key={course.id}>
                <div className="card action-trigger-hover border">
                  {/* Image */}
                  <img src={course.image} className="card-img-top" alt="course image" />
                  {/* Ribbon */}
                  {course.price === 'Free' && <div className="ribbon mt-3"><span>Free</span></div>}
                  {/* Card body */}
                  <div className="card-body pb-0">
                    <div className="d-flex justify-content-between mb-3">
                      <span className="hstack gap-2">
                        <a href="#" className="badge bg-primary bg-opacity-10 text-primary">{course.category}</a>
                        <a href="#" className="badge text-bg-dark">All level</a>
                      </span>
                      <a href="#" className="h6 fw-light mb-0"><i className="far fa-bookmark"></i></a>
                    </div>
                    {/* Title */}
                    <h5 className="card-title"><a href="#">{course.title}</a></h5>
                    {/* Rating */}
                    <div className="d-flex justify-content-between mb-2">
                      <div className="hstack gap-2">
                        <p className="text-warning m-0">{course.rating.toFixed(1)}<i className="fas fa-star text-warning ms-1"></i></p>
                        <span className="small">({course.students})</span>
                      </div>
                      <div className="hstack gap-2">
                        <p className="h6 fw-light mb-0 m-0">{course.students}</p>
                        <span className="small">(Student)</span>
                      </div>
                    </div>
                    {/* Time */}
                    <div className="hstack gap-3">
                      <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2"></i>{course.time}</span>
                      <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2"></i>{course.lectures} lectures</span>
                    </div>
                  </div>
                  {/* Card footer */}
                  <div className="card-footer pt-0 bg-transparent">
                    <hr />
                    {/* Avatar and Price */}
                    <div className="d-flex justify-content-between align-items-center">
                      {/* Avatar */}
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-sm">
                          <img className="avatar-img rounded-1" src={course.avatar} alt="avatar" />
                        </div>
                        <p className="mb-0 ms-2"><a href="#" className="h6 fw-light mb-0">{course.author}</a></p>
                      </div>
                      {/* Price */}
                      <div>
                        {course.price === 'Free' ? (
                          <h4 className="text-success mb-0 item-show">Free</h4>
                        ) : (
                          <h4 className="text-success mb-0 item-show">{course.price}</h4>
                        )}
                        <a href="#" className="btn btn-sm btn-success-soft item-show-hover"><i className="fas fa-shopping-cart me-2"></i>Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* =======================
      Trending courses END */}
    </>
  );
};

export default Home;
