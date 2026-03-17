import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabase';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail_url: '/assets/images/courses/4by3/02.jpg', // Default AI image added earlier
    youtube_url: '', // For the first lesson
    lesson_title: '' // For the first lesson
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1. Get current instructor
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // 2. Insert into Courses
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .insert([{
          instructor_id: user.id,
          title: formData.title,
          description: formData.description,
          price: formData.price ? parseFloat(formData.price) : 0.00,
          thumbnail_url: formData.thumbnail_url,
          status: 'published' // Auto publish for testing
        }])
        .select()
        .single();

      if (courseError) throw courseError;

      // 3. Create initial lesson (if provided)
      if (formData.youtube_url && formData.lesson_title) {
        const { error: lessonError } = await supabase
          .from('lessons')
          .insert([{
            course_id: courseData.id,
            title: formData.lesson_title,
            youtube_url: formData.youtube_url,
            order: 1
          }]);
        if (lessonError) throw lessonError;
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/instructor/dashboard');
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card bg-transparent border rounded-3 mb-5">
        <div className="card-header bg-light border-bottom px-lg-5">
          <h5 className="mb-0">Create a New Course</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Course successfully created! Redirecting...</div>}

            <h4 className="mb-4">Course details</h4>
            <div className="row g-4">
              
              {/* Course Title */}
              <div className="col-12">
                <label className="form-label">Course title *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="title"
                  placeholder="e.g. Complete React Guide" 
                  value={formData.title}
                  onChange={handleChange}
                  required 
                />
              </div>

              {/* Course Price */}
              <div className="col-md-6">
                <label className="form-label">Price ($) *</label>
                <input 
                  type="number" 
                  className="form-control" 
                  name="price"
                  placeholder="e.g. 49.99" 
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required 
                />
              </div>

              {/* Thumbnail URL */}
              <div className="col-md-6">
                <label className="form-label">Thumbnail URL</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="thumbnail_url"
                  placeholder="/assets/images/courses/4by3/02.jpg" 
                  value={formData.thumbnail_url}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label">Course description</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  name="description"
                  placeholder="What is this course about?"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <hr className="my-5" />
              <h4 className="mb-4">Initial Lesson (Optional)</h4>

              {/* Lesson Title */}
              <div className="col-md-6">
                <label className="form-label">Lesson Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="lesson_title"
                  placeholder="e.g. Introduction" 
                  value={formData.lesson_title}
                  onChange={handleChange}
                />
              </div>

              {/* YouTube URL */}
              <div className="col-md-6">
                <label className="form-label">YouTube URL</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="youtube_url"
                  placeholder="e.g. https://youtube.com/watch?v=..." 
                  value={formData.youtube_url}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <div className="d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Course'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
