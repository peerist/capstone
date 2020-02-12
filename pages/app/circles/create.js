import React from 'react'
import { withAuth, withLoginRequired } from 'use-auth0-hooks'

import AppHeader from '../../../components/app_header'
import Container from '../../../components/container'

class CreateCircle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      circleName: '',
      subject: '',
      privacy: ''
    }

    this.handleNewCircleInput = this.handleNewCircleInput.bind(this);
  }

  handleNewCircleInput(event) {
    const target = event.target;
    const value = target.type === 'select' ? target.select : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <div>
          <AppHeader header={[{name: 'Dashboard', dest: '/app'}, {name: 'Circles', dest: '/app/circles'}, {name: 'Create Circle', dest: '/app/circles/create'}]}/>
        </div>
        <div>
          <Container pt={3}>
            <div>
              <label>
                Circle name<br />
                <input
                  name="circleName"
                  type="value"
                  value={this.state.circleName}
                  onChange={this.handleNewCircleInput}
                />
              </label>
            </div>
          </Container>

          <Container pt={3}>

            <div>
              <label>
                Subject<br />
                <input
                  name="subject"
                  type="value"
                  value={this.state.subject}
                  onChange={this.handleNewCircleInput}
                />
              </label>
            </div>
          </Container>

          <Container pt={3}>
            <div>
              <label>
                Privacy<br />
                <select
                  name="privacy"
                  type="select"
                  value={this.state.subject}
                  onChange={this.handleNewCircleInput}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>>
                </select>
              </label>
            </div>
          </Container>
            
          <Container pt={3}>
            <div>
              <button type="">Create Circle</button>
            </div>
          </Container>
        </div>
      </form>
    )
  }
 
}

export default withLoginRequired(withAuth(CreateCircle))
