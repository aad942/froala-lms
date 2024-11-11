import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FroalaComponent from './FroalaComponent';

function ChapterDetails() {
  const { courseId, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedChapter, setEditedChapter] = useState({});
  const [chapterImage, setChapterImage] = useState('');

  // Fetch details for the chapter
  const fetchChapterDetails = async () => {
    const response = await fetch(`path-to-backend/getChapterById.php?chapterId=${chapterId}`);
    const data = await response.json();
    setChapter(data);
    setEditedChapter({
      ...data,
      chapter_id: chapterId
    });
  };

  useEffect(() => {
    fetchChapterDetails();
  }, [chapterId]);

  if (!chapter) {
    return <p>Loading chapter details...</p>;
  }

  const handleSetChapterContent = (content) => {
    console.log("Updated chapter content:", content);
    setEditedChapter((prev) => ({
      ...prev,
      chapter_content: content,
    }));
  };

  const handleEditChapter = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedChapter(chapter);
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    console.log('Data being sent:', editedChapter);
    const response = await fetch('path-to-backend/updateChapter.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedChapter)
    });

    if(response.ok){
      setChapter(editedChapter);
      setIsEditing(false);
    }
    else{
      console.error('Failed to save chapter.');
    }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setEditedChapter({
      ...editedChapter,
      [name]: value
    })
  }

  return (
    <div>
      <form onSubmit={handleSaveEdit}>
        <h1>Chapter Details</h1>
        <div>
          <Link to={`/chapters/${courseId}`}>
            <button>Back to Chapters</button>
          </Link>
        </div>
        {isEditing ? (
          <>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button type="button" onClick={handleEditChapter}>Edit</button>
        )}

        <div>
            <div className="chapter-card">
              <h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="chapter_title"
                    value={editedChapter.chapter_title}
                    onChange={handleInputChange}
                  />
                ) : (
                  chapter.chapter_title
                )}
              </h3>
              <p>
                {isEditing ? (
                  <textarea
                    name="chapter_description"
                    value={editedChapter.chapter_description}
                    onChange={handleInputChange}
                  />
                ) : (
                  chapter.chapter_description
                )}
              </p>
              <FroalaComponent 
                initialContent={isEditing ? editedChapter.chapter_content : chapter.chapter_content}
                setChapterContent={handleSetChapterContent}
                setChapterImage={setChapterImage}
                isEditing={isEditing} 
              />
              <p>This is how the Filestack URL will appear if stored separately in the database: <a href={chapter.chapter_img_url}>{chapter.chapter_img_url}</a></p>
              <p>Date Published: {chapter.date_published ? new Date(chapter.date_published.date).toLocaleDateString() : 'N/A'}</p>
            </div>
        </div>
      </form>
    </div>
  );
}

export default ChapterDetails;