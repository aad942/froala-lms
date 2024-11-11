import React, { useState } from 'react';

function CourseModal({ onSaveCourse, onClose }) {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleSubmitCourse = async (e) => {
    e.preventDefault();

    const newCourse = {
      title: courseTitle,
      description: courseDescription,
      date_published: new Date().toISOString().split('T')[0],
    };

    const response = await fetch('path-to-backend/saveCourse.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCourse),
    });

    const result = await response.json();
    if (response.ok) {
      onSaveCourse(); // This will call fetchCourses from Courses.jsx
    } else {
      console.error('Failed to save course:', result);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmitCourse}>
        <h3>New Course</h3>
        <label>Title</label>
        <input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required />
        
        <label>Description</label>
        <textarea value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} required />

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default CourseModal;