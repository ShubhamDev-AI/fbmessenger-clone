import { IconButton, Input, FormControl } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import React, { Component } from "react"
import Header from "../components/Header"
import { auth, db } from "../services/firebase"
import FlipMove from 'react-flip-move'
import Msg from './Msg'
import './Msg.css'
import './Chat.css'

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
        .on("value", snapshot => { //.on() connect FE & FB,
          //SELECT FROM "chats" of FB, viết trong hàm componentDidMount()
          let chatsTmp = [] //snapshot.val() là arr, nhg KO thể gán direct chatsTmp=snapshot.val()
          //nếu KO dùng DB realtime mà dùng filestore:
          //snapshot.docs.map(doc => { })
          snapshot.forEach(snap => {
            chatsTmp.push(snap.val())
          })
          //msg mới lên đầu msg cũ đẩy xuống dưới, khác với chatsTmp.reverse()
          //nếu KO dùng DB realtime mà dùng filestore:
          //db.collection('dbname').orderBy('timestamp', 'desc').onSnapshot(snapshot => { })
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
    const { user, chatsContent } = this.state
    const { uid, displayName, email, photoURL } = user
    this.setState({ writeError: null })
    const chatArea = this.refChatArea.current
    if (chatsContent.trim() !== '') {
      try {
        await db.ref("chats").push({ //INS INTO "chats" of FB, viết trong hàm handleSubmit()
          //syntax: firebase.database.ref("dbname").push({JSON})
          //nếu KO dùng DB realtime mà dùng filestore:
          //db.collection('dbname').add({ JSON })
          content: chatsContent,
          timestamp: Date.now(),
          uid: uid,
          name: (displayName) ? displayName : email,
          photoURL: photoURL,
        })
        this.setState({ chatsContent: '' })
        chatArea.scrollBy(0, chatArea.scrollHeight)
      } catch (error) {
        this.setState({ writeError: error.message })
      }
    }
  }

  render() {
    const { loadingChats, chats, user, chatsContent, readError, writeError } = this.state
    return (
      <div>
        <Header />

        <div className="chat-area" ref={this.refChatArea}>
          <div className="App">
            <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
              style={{ marginTop: '1px' }} alt='fb-icon' />
            <h2>FB Messenger</h2>
            <small className="mess__username">
              Xin chào {(user.displayName) ? user.displayName : user.email}
            </small>
          </div>
          {/* loading indicator */}
          {loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}
          {readError ? <p className="text-danger">{readError}</p> : null}
          {/* chat area */}
          <FlipMove style={{ zIndex: -1 }}>
            {chats.map((chat_item, chiso) => {
              return <Msg key={chiso} user={user} chat_item={chat_item} />
            })}
          </FlipMove>
        </div>
        <form onSubmit={this.handleSubmit} className="chat_form">
          <FormControl className="app__formControl">
            <Input className="app__input" placeholder="Nhập tin nhắn..." value={chatsContent} onChange={this.handleChange} name="chatsContent" />
            {writeError ? <p className="text-danger">{writeError}</p> : null}
            <IconButton className="app__iconButton" disabled={!chatsContent.replace(/\s/g, '').length}
              variant="contained" color="primary" type="submit">
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
        <div className="py-5 mx-3">
          <span role="img" aria-label="mail">📩</span> login: <strong className="text-info">{user.email}</strong>
        </div>
      </div>
    )
  }
}
