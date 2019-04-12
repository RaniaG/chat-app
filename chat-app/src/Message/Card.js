import React from 'react';
import { editMessage, deleteMessage } from '../API/api';

export class MessageCard extends React.Component {
    state = {
        edit: false,
        message: this.props.message
    }
    toggleEdit = () => {
        debugger;
        this.setState({ edit: true });
    }
    onChange = (e) => {
        this.setState({ message: e.target.value });
    }
    delete = () => {
        deleteMessage(this.props._id);
        this.props.reload();
    }
    submitEdit = (e) => {
        e.preventDefault();
        editMessage(this.props._id, this.state.message);
        this.setState({ edit: false });
    }

    render() {
        const { show, message, sender, reciever } = this.props;
        return (
            <div className="msg">
                <div className="msg__title">
                    {show === 'recieved' && <div className="msg__link">{sender.username}</div>}
                    {show === 'sent' && <div className="msg__link">{reciever.username}</div>}
                    <div className="msg__delete">
                        <i className="fas fa-trash" onClick={this.delete}></i>
                    </div>
                </div>
                <small className="muted">Double click on message body to edit</small>
                {
                    this.state.edit ?
                        <form action="" onSubmit={this.submitEdit}>
                            <input type="text" value={this.state.message} onChange={this.onChange} />
                        </form>
                        : <div className="msg__body" onDoubleClick={this.toggleEdit}>
                            {this.state.message}
                        </div>
                }

            </div>
        )
    }
}