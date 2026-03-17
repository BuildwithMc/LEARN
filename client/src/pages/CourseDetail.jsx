import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      // Fetch course
      const { data: courseData } = await supabase
        .from('courses')
        .select(`*, instructor:profiles(full_name, avatar_url)`)
        .eq('id', id)
        .single();

      if (courseData) {
        setCourse(courseData);
        // Fetch lessons
        const { data: lessonData } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', id)
          .order('order', { ascending: true });
        
        if (lessonData) setLessons(lessonData);
      }
      setLoading(false);
    };

    fetchCourseDetails();
  }, [id]);

  const handleEnroll = async () => {
    setIsProcessing(true);
    try {
      // 1. Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Please login first to enroll in courses.");
        navigate('/login');
        return;
      }

      // Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .single();
        
      if (existingEnrollment) {
        alert("You are already enrolled in this course!");
        navigate('/student/dashboard');
        return;
      }

      // 2. Handle Free Course OR Paid Course via Paystack
      if (course.price === 0) {
        // Free enrollment
        await supabase.from('enrollments').insert([{
          user_id: user.id,
          course_id: course.id,
          amount_paid: 0.00
        }]);
        alert("Successfully enrolled!");
        navigate('/student/dashboard');
      } else {
        // Init Paystack transaction by proxying through our Vite dev server
        const paystackSecret = import.meta.env.VITE_PAYSTACK_SECRET_KEY;
        const callbackUrl = `${window.location.origin}/payment/verify?course_id=${course.id}&user_id=${user.id}`;
        
        const response = await fetch('/paystack/transaction/initialize', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${paystackSecret}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: user.email,
            amount: Math.round(course.price * 100), // Paystack expects lowest currency denomination (kobo/cents)
            callback_url: callbackUrl,
            metadata: {
              custom_fields: [
                {
                  display_name: "Course ID",
                  variable_name: "course_id",
                  value: course.id
                }
              ]
            }
          })
        });

        const data = await response.json();
        
        if (data.status) {
          // Redirect to Paystack Checkout URL
          window.location.href = data.data.authorization_url;
        } else {
          alert('Failed to initialize payment: ' + data.message);
        }
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during enrollment.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="text-center py-5">Loading course...</div>;
  if (!course) return <div className="text-center py-5">Course not found.</div>;

  return (
    <>
      <section className="bg-dark pt-5" style={{background: 'url(/assets/images/pattern/04.png) no-repeat center center', backgroundSize: 'cover'}}>
        <div className="container pt-5">
          <div className="row g-4 align-items-center mb-5">
            <div className="col-lg-8">
              <span className="badge bg-success bg-opacity-10 text-success mb-2">Development</span>
              <h1 className="text-white">{course.title}</h1>
              <p className="text-white">{course.description || "Learn everything you need to know directly from experts."}</p>
              <ul className="list-inline mb-0 text-white">
                <li className="list-inline-item me-3 mb-1"><i className="fas fa-star text-warning me-2"></i>4.5/5.0</li>
                <li className="list-inline-item me-3 mb-1"><i className="bi bi-patch-check-fill text-info me-2"></i>Certified Course</li>
                <li className="list-inline-item me-3 mb-1"><i className="fas fa-user-graduate text-orange me-2"></i>Enrolled Students</li>
              </ul>
            </div>
            <div className="col-lg-4 text-lg-end">
               <img src={course.thumbnail_url} className="rounded-4 img-fluid" alt="Course Thumbnail" style={{maxHeight:'300px'}} />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-xl-8">
              <div className="card shadow rounded-2 mb-4">
                <div className="card-header border-bottom">
                  <h4 className="mb-0">Course Curriculum</h4>
                </div>
                <div className="card-body">
                  {lessons.length === 0 ? (
                    <p>No lectures available yet.</p>
                  ) : (
                    <div className="accordion accordion-icon accordion-bg-light" id="accordionCourse">
                      {lessons.map((lesson, idx) => (
                        <div className="accordion-item mb-3" key={lesson.id}>
                          <h6 className="accordion-header" id={`heading-${lesson.id}`}>
                            <button className={`accordion-button fw-bold rounded d-inline-block collapsed`} type="button">
                              Lecture {idx + 1}: {lesson.title}
                            </button>
                          </h6>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="card shadow p-4 mb-4 z-index-9">
                <h4 className="mb-3">
                  {course.price === 0 ? 'Free' : `$${course.price.toFixed(2)}`}
                </h4>
                <button 
                  onClick={handleEnroll} 
                  className="btn btn-success mb-2 w-100"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Enroll Now / Buy'}
                </button>
                <hr />
                <div className="d-flex align-items-center mb-3">
                    <img className="avatar avatar-sm rounded-circle me-2" src={course.instructor?.avatar_url || '/assets/images/avatar/04.jpg'} alt="instructor" />
                    <h6 className="mb-0">Created by {course.instructor?.full_name || 'Instructor'}</h6>
                </div>
                <ul className="list-group list-group-borderless mb-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-book-open text-primary"></i> Lectures</span>
                    <span>{lessons.length}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-clock text-primary"></i> Duration</span>
                    <span>10h 30m</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-signal text-primary"></i> Skills</span>
                    <span>All levels</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-globe text-primary"></i> Language</span>
                    <span>English</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-medal text-primary"></i> Certificate</span>
                    <span>Yes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetail;
