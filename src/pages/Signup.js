import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { signup, signInWithGoogle, signInWithGitHub } from "../helpers/auth"

export default class SignUp extends Component {

  constructor() {
    super()
    this.state = {
      err: null,
      email: '',
      password: '',
      photoURL: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onGGLogIn = this.onGGLogIn.bind(this)
    this.onGithubLogIn = this.onGithubLogIn.bind(this)
  }

  handleChange(event) {
    const { name, value, type } = event.target
    this.setState({
      [name]: value
    })
    if (type === 'select-one') {
      document.getElementById('image_preview').src = value
    }
  }

  async handleSubmit(event) {
    const {
      email,
      password,
      photoURL,
    } = this.state
    event.preventDefault()
    this.setState({ err: '' })
    try {
      await signup(email, password, photoURL)
    } catch (err) {
      this.setState({ err: err.message })
    }
  }

  async onGGLogIn() {
    try {
      await signInWithGoogle()
    } catch (err) {
      this.setState({ err: err.message })
    }
  }

  async onGithubLogIn() {
    try {
      await signInWithGitHub()
    } catch (err) {
      console.log(err)
      this.setState({ err: err.message })
    }
  }

  render() {
    const {
      err,
      email,
      password,
      photoURL,
    } = this.state
    return (
      <div className="container">
        <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
          <h1>
            Đăng kí cho
          <Link className="title ml-2" to="/">FBMessengerClone</Link>
          </h1>
          <p className="lead">Điền các thông tin sau để đăng kí tài khoản:</p>
          <div className="form-group">
            <input className="form-control" placeholder="Email" name="email"
              type="email" onChange={this.handleChange} value={email}></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Password" name="password"
              onChange={this.handleChange} value={password} type="password"></input>
          </div>

          <div className="form-group">
            <i className="fa fa-camera" />
            {' '}
            <select name="photoURL"
              value={photoURL} onChange={this.handleChange}>
              <option value='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3xzYvQWyS8JS6g3PXJwsf8dcEi6bgjjJocg&usqp=CAU'>Hình 1</option>
              <option value='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROrpa-OR0dG5As3B2u_9_loE-FulOlDDQKtF1g_tclfJILjW5I'>Hình 2</option>
              <option value='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRd-y-IJN8glQlf1qoU01dEgGPUa0d1-sjfWg&usqp=CAU'>Hình 3</option>
            </select>
          </div>
          <div className={photoURL != null ? 'file-upload-previewer' : 'file-upload-previewer hidden'}>
            <img src="" alt="" id="image_preview" />
          </div>

          <div className="form-group">
            {err ? <p className="text-danger">{err}</p> : null}
            <button className="btn btn-primary px-5" type="submit">Đăng kí</button>
          </div>
          <p>Bạn cũng có thể login với tài khoản Google và Github:</p>
          <button className="btn btn-danger mr-2" type="button"
            onClick={this.onGGLogIn}>
            Login với Google
          </button>
          <button className="btn btn-secondary" type="button"
            onClick={this.onGithubLogIn}>
            Login với GitHub
          </button>
          <hr></hr>
          <p>Đã có tài khoản rồi? <Link to="/login">Login</Link></p>
        </form>
      </div>
    )
  }
}
