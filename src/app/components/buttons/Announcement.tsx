import React from 'react'
import "./Announcement.css"
const Announcement = () => {
  return (
    <button className="btn" type="button">
    <strong>Check Latest Announcement</strong>
    <div id="container-stars">
      <div id="stars"></div>
    </div>
  
    <div id="glow">
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  </button>
  )
}

export default Announcement
