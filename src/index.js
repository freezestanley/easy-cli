import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
// import Router from './src/App'

const Chat = () => (
    <div className={classNames('chat')}>
      <div>this is Chat</div>
    </div>
  )

ReactDOM.render(
  <Chat/>,
  document.getElementById('other')
)