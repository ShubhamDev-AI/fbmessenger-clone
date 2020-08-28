import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../services/firebase'

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <div className="navbar-brand">
          <span role="img" aria-label="mail">📲</span>FBMessengerClone
          </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <button style={{ marginTop: '1px' }} className="btn btn-primary mr-3"
                onClick={() => auth().signOut()}>
                Logout
              </button>
              {/* Cách KO hiện warning of <a href=''/> */}
              {/* <a href="#!" onClick={() => auth().signOut()}>Logout</a> */}
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3" to="/login">Log in</Link>
              <Link className="nav-item nav-link mr-3" to="/signup">Đăng kí</Link>
            </div>}
        </div>
      </nav>
    </header>
  )
}

export default Header