import React, { useState, useEffect } from 'react';
import CourseModal from './CourseModal';
import { Link } from 'react-router-dom';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCourses = async () => {
    // Fetch courses from the back end
    const response = await fetch('path-to-backend/fetchCourses.php');
    const data = await response.json();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSaveCourse = () => {
    fetchCourses(); // Fetch courses again after saving a new one
    setIsModalOpen(false);
  };

  return (
    <div className="course-list">
      <h1>My Simple yet Powerful LMS</h1>
      <h2>Courses</h2>

      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        {isModalOpen ? 'Close' : 'Add a Course'}
      </button>

      {isModalOpen && <CourseModal onSaveCourse={handleSaveCourse} onClose={() => setIsModalOpen(false)} />}
      {courses.map((course) => (
        <div key={course.course_id} className="course-card">
          <h3>{course.course_title}</h3>
          <p>{course.course_description}</p>
          <p>Date Published: {course.date_published ? new Date(course.date_published.date).toLocaleDateString() : 'N/A'}</p>
          <Link to={`/chapters/${course.course_id}`}>
            <button>View Course</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Courses;
