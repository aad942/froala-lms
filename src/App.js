import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Courses from './components/Courses';
import Chapters from './components/Chapters';
import ChapterDetails from './components/ChapterDetails'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/chapters/:courseId" element={<Chapters />} />
        <Route path="/chapterDetails/:courseId/:chapterId" element={<ChapterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;