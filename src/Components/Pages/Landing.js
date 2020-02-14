import React, { Component } from 'react'

class Landing extends Component {

  render() {
    return (
      <div>
      <h1>Welcome!</h1>
      <ul>
        <li>
          Check out the forum by clicking the forum tab above.
        </li>
        <li>
          You can edit the forum on the Admin page.
        </li>
        <li>
          Note: The admin page is not fully functional at the moment, and you will need to refresh the page after adding or deleting a forum. 
        </li>
      </ul>
      </div>
    )
  }
}
export default Landing