import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CourseList from './components/CourseList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CourseList />
    </div>
  );
}

export default App;
