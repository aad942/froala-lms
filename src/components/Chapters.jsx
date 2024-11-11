import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChapterModal from './ChapterModal';
import { Link } from 'react-router-dom';

function Chapters() {
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [course, setCourse] = useState(null); // To store course details
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch chapters for the course
  const fetchChapters = async () => {
    const response = await fetch(`path-to-backend/fetchChapters.php?course_id=${courseId}`);
    const data = await response.json();
    setChapters(data);
  };

  // Fetch course details
  const fetchCourseDetails = async () => {
    const response = await fetch(`path-to-backend/getCourseById.php?courseId=${courseId}`);
    const data = await response.json();
    setCourse(data);
  };

  useEffect(() => {
    fetchChapters();
    fetchCourseDetails(); // Fetch course details on load
  }, [courseId]);

  const handleSaveChapter = (newChapter) => {
    setChapters([...chapters, newChapter]);
    setIsModalOpen(false);
  };

  if (!course) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="course-details">
      <h1>{course.course_title}</h1>
      <p>Description: {course.course_description}</p>
      <p>Date Published: {course.date_published ? new Date(course.date_published.date).toLocaleDateString() : 'N/A'}</p>
      <Link to={`/`}>
        <button>Back to Courses</button>
      </Link>

      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        {isModalOpen ? 'Close' : 'Add a Chapter'}
      </button>
      
      <div className="chapter-list">
        {chapters.map((chapter) => (
          <div key={chapter.chapter_id} className="chapter-card">
            <h3>{chapter.chapter_title}</h3>
            <p>{chapter.chapter_description}</p>
            <p>Date Published: {chapter.date_published ? new Date(chapter.date_published.date).toLocaleDateString() : 'N/A'}</p>
            <Link to={`/chapterDetails/${course.course_id}/${chapter.chapter_id}`}>
              <button>Details</button>
            </Link>
          </div>
        ))}
      </div>

      {isModalOpen && <ChapterModal courseId={courseId} onSaveChapter={handleSaveChapter} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Chapters;
