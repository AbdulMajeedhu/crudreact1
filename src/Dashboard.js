import React from 'react'

function Dashboard() {
    const userId = localStorage.getItem("students_userId");
    alert(userId);
    if (!userId) {
        window.location.href = "/login";
    }
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
