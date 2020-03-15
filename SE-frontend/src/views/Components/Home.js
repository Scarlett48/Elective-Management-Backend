import React from "react"
import "./Home.css"

var Home = () => {
  return (
    <div className="home">
      <table align="center">
        <tr>
          <td className="title">
            <p>Elective Management System</p>
          </td>
          <td className="instructions">
            <h1>Instructions</h1>
            <p>
              The View Electives tab will allow you to view all the available
              electives for the respective semester and department
            </p>
            <p>
              You will be allowed to choose any three electives as your top
              three preference
            </p>
            <p>You will be allowed to change preferences only one more time</p>
            <p>
              After a particular deadline, you will not be allowed to change
              your preference
            </p>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default Home
