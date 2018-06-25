import React, {Component } from 'react';
import viewers from './Glitch_White_CMYK.png'
import {
  Columns,
  Content,
  Media,
  Image,
  Card,
  Heading
} from 'react-bulma-components'
import 'bulma/css/bulma.css'

class UserTab extends Component {
  render() {

    return (<div >
      <Columns.Column className="userCard" size={6}>
        <Card className="contenta" onClick={() => {
            window.open("https://www.twitch.tv/"+this.props.user.name)
          }}>
            <Card.Image size="4by3" src={this.props.user.image}/>
          <Card.Content>
            <Media>
              <Heading style={{textAlign: "center"}}>
                {this.props.user.name} - {this.props.user.viewers}
                <Media.Item style={{padding: "8px", float:"right"}}>
                  <Image renderAs="p" size={24} src={viewers}/>
                </Media.Item>
              </Heading>
            </Media>
            <div className="contenta-overlay"></div>
            <Content>
              {this.props.user.title}

              <small>
                <time dateTime="2016-1-1">
                  {this.props.user.date}
                </time>
              </small>
            </Content>
          </Card.Content>
        </Card>
      </Columns.Column>
    </div>);
  }
}

export default UserTab;
