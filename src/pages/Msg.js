import { Card, CardContent, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './Msg.css'

function formatTime(timestamp) {
    const d = new Date(timestamp)
    const time = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    return time
}

//Nếu KO dùng class component thì có thể dùng React.forwardRef() như cmt out
// const Msg = React.forwardRef(({ user, chat_item }, ref) => {
class Msg extends Component {
    render() {
        const { user, chat_item } = this.props
        const isUser = user.uid === chat_item.uid
        return (
            <div className="messageBox">
                {/* Dùng React.forwardRef(): <div ref={ref} className={`message ${isUser && 'message__user'}`} > */}
                <div className={`message ${isUser && 'message__user'}`} >
                    <small style={{
                        textAlign: 'center',
                        position: 'relative',
                        '& button': {
                            position: 'absolute',
                            top: '80%',
                            left: '70%'
                        }
                    }}>
                        <img src={chat_item.photoURL} alt={chat_item.name} style={{
                            width: 25,
                            height: 25,
                            objectFit: 'cover',
                            maxWidth: '100%',
                            borderRadius: '50%'
                        }} />
                    </small>
                    <small className="mess__username" >
                        {chat_item.name}
                    </small>
                    <Card style={{ borderRadius: '1.3em', lineHeight: '1.34', width: 'fit-content' }}>
                        <CardContent className={isUser ? 'message__userCard' : 'message__guestCard'} style={{ paddingTop: '6px', paddingRight: '12px', paddingBottom: '7px', paddingLeft: '12px' }}>
                            <Typography>
                                <big>{chat_item.content}</big>
                            </Typography>
                        </CardContent>
                    </Card>
                    <small className="mess__username float-right">
                        <i>{formatTime(chat_item.timestamp)}</i>
                    </small>
                </div>
                <br /><br />
            </div>
        )
    }
}

export default Msg
