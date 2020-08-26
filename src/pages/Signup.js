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
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onGGLogIn = this.onGGLogIn.bind(this)
    this.onGithubLogIn = this.onGithubLogIn.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    const {
      email,
      password,
    } = this.state
    event.preventDefault()
    this.setState({ err: '' })
    try {
      await signup(email, password)
      // alert('Đã đăng kí thành công, xin hãy click "Login"!')
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
