import React, { useState } from 'react';
import FroalaComponent from './FroalaComponent';

function ChapterModal({ courseId, onSaveChapter, onClose }) {
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterDescription, setChapterDescription] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [chapterImage, setChapterImage] = useState('');

  const handleSubmitChapter = async (e) => {
    e.preventDefault();

    console.log('Chapter Image URL:', chapterImage);

    const newChapter = {
      course_id: courseId,
      title: chapterTitle,
      description: chapterDescription,
      content: chapterContent,
      chapter_img: chapterImage, // Filestack URL
      date_published: new Date().toISOString().split('T')[0],
    };

    const response = await fetch('path-to-backend/saveChapter.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newChapter),
    });

    const result = await response.json();
    if (response.ok) {
      onSaveChapter(result);
    } else {
      console.error('Failed to save chapter:', result);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmitChapter}>
        <h3>Add New Chapter</h3>
        <label>Title</label>
        <input type="text" value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} required />
        
        <label>Description</label>
        <textarea value={chapterDescription} onChange={(e) => setChapterDescription(e.target.value)} required />
        
        <label>Content</label>
        <FroalaComponent setChapterContent={setChapterContent} setChapterImage={setChapterImage} isEditing={true}/>

        <div><button type="submit">Save</button> <button type="button" onClick={onClose}>Cancel</button></div>
      </form>
    </div>
  );
}

export default ChapterModal;
