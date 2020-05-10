import React from 'react'
import { getCurrentUser } from '../amplify'

export default class AboutPage extends React.Component {

  state={
    user:{ username: ''}
  }

  componentWillMount = () => {    
    getCurrentUser().then(user => {
      this.setState({user})
    })
      .catch(e => {
        console.log("error:", e)
      })
  }

  render() {
    return (
    <h1>hello user: {this.state.user?.username}</h1>
    )
  }
}
