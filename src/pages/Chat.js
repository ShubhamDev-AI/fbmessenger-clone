import React, { Component } from "react"
import Header from "../components/Header"
import { auth, db } from "../services/firebase"

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: auth().currentUser,
      chats: [],
      chatsContent: '',
      readError: null,
      writeError: null,
      loadingChats: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.refChatArea = React.createRef()
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true })
    const chatArea = this.refChatArea.current
    try {
      db.ref("chats")
        .on("value", snapshot => { //.on() connect FE & FB,  SELECT FROM "chats" of FB
          let chatsTmp = []
          snapshot.forEach(snap => {
            chatsTmp.push(snap.val())
          })
          chatsTmp.sort(function (a, b) { return a.timestamp - b.timestamp })
          this.setState({ chats: chatsTmp })
          chatArea.scrollBy(0, chatArea.scrollHeight)
          this.setState({ loadingChats: false })
        })
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false })
    }
  }

  handleChange(event) {
    this.setState({
      chatsContent: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.setState({ writeError: null })
    const chatArea = this.refChatArea.current
    try {
      await db.ref("chats").push({ //INS INTO "chats" of FB
        content: this.state.chatsContent,
        timestamp: Date.now(),
        uid: this.state.user.uid,
        umail: this.state.user.email,
      })
      this.setState({ chatsContent: '' })
      chatArea.scrollBy(0, chatArea.scrollHeight)
    } catch (error) {
      this.setState({ writeError: error.message })
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp)
    const time = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    return time
  }

  render() {
    const { loadingChats, chats, user, chatsContent, readError, writeError } = this.state
    return (
      <div>
        <Header />

        <div className="chat-area" ref={this.refChatArea}>
          {/* loading indicator */}
          {loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}
          {readError ? <p className="text-danger">{readError}</p> : null}
          {/* chat area */}
          {chats.map(chat_item => {
            return (
              <p style={{ paddingTop: '0px' }} key={chat_item.timestamp} className={"chat-bubble " + (user.uid
                === chat_item.uid ? "current-user" : "")}>
                <small><i>{chat_item.umail}</i></small>
                <br />
                {chat_item.content}
                <br />
                <span className="chat-time float-right">
                  {this.formatTime(chat_item.timestamp)}
                </span>
              </p>
            )
          })}
        </div>
        <form onSubmit={this.handleSubmit} className="mx-3">
          <textarea className="form-control" name="chatsContent" onChange={this.handleChange}
            value={chatsContent} placeholder="Nhập tin nhắn..." />
          {writeError ? <p className="text-danger">{writeError}</p> : null}
          <button type="submit" className="btn btn-submit px-5 mt-4">Gửi</button>
        </form>
        <div className="py-5 mx-3">
          Tài khoản login: <strong className="text-info">{user.email}</strong>
        </div>
      </div>
    )
  }
}
