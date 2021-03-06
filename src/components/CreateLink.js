import React, { Component } from 'react'
import CreateLinkMutation from '../mutations/CreateLinkMutation'
import { getUserIDFromLocalStorage } from '../lib/utils'
class CreateLink extends Component {

  state = {
    description: '',
    url: ''
  }

  render() {

    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the link'
          />
          <input
            className='mb2'
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the link'
          />
        </div>
        <div
          className='button'
          onClick={() => this._createLink()}
        >
          submit
        </div>
      </div>
    )

  }

  _createLink = () => {
    const postedById = getUserIDFromLocalStorage();
    if(!postedById){
      return console.error('No user logged in');
    }
    const { description, url } = this.state
    CreateLinkMutation(postedById, description, url, () => this.props.history.push('/'))
  }

}

export default CreateLink