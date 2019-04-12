import React from 'react';
import { MessageCard } from './Card';
import { getSentMessages, getRecievedMessages } from '../API/api';
import { AddMessage } from './Add';

export class MessagesListing extends React.Component {
    state = {
        data: [],
        error: false,
        show: 'sent'
    }
    componentDidMount() {
        this.reload();
    }
    reload = () => {
        const self = this;
        getSentMessages()
            .then((response) => {
                self.setState({ data: response.data });
            })
            .catch((err) => {
                self.setState({ error: true });
            });
    }

    onClick = (arg) => {
        const self = this;
        return (e) => {
            const cases = {
                "sent": getSentMessages
                ,
                "recieved": getRecievedMessages
            }
            cases[arg]().then((response) => {
                // debugger;
                self.setState({ data: response.data, error: false });
            })
                .catch((err) => {
                    self.setState({ error: true });
                })
            self.setState({ show: arg });
        }
    }
    render() {
        return (
            <div className="section">
                <div className="side-menu">
                    <div className={`side-menu__item ${this.state.show === "sent" ? 'active' : ""}`} onClick={this.onClick('sent')}>
                        Sent
                    </div>
                    <div className={`side-menu__item ${this.state.show === "recieved" ? 'active' : ""}`} onClick={this.onClick('recieved')}>
                        Recieved
                    </div>
                </div>

                <div className="list">
                    <AddMessage reload={this.reload} />
                    {this.state.error && <h2>Unable to get messages</h2>}
                    {this.state.data.map(el => <div className="list__item" key={el._id}><MessageCard {...el} show={this.state.show} reload={this.reload} /></div>)}
                </div>
            </div>
        )
    }
}