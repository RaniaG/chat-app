import React from 'react';
import { getAllUsers, sendMessage } from '../API/api';



export class AddMessage extends React.Component {

    state = {
        users: [],
        filteredUsers: [],
        error: false,
        messageSent: false,
        userError: true,
        to: {
            _id: 0,
            username: ''
        },
        message: '',
        activeIndex: -1
    }

    componentDidMount() {
        //fetch names of all users;
        const self = this;
        getAllUsers()
            .then((response) => {
                // debugger;
                self.setState({ users: response.data });
            })

        document.addEventListener('mousedown', this.handleClickOutside);

    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside = (e) => {
        this.setState({ filteredUsers: [] });
    }
    onChange = (e) => {
        const filteredUsers = this.state.users.filter(el => el.username.includes(e.target.value));
        this.setState({ filteredUsers, to: { _id: 0, username: e.target.value } });
    }
    autocompleteMove = (e) => {
        debugger;
        const { activeIndex } = this.state;
        const filteredUsers = this.state.filteredUsers.length === 0 ? this.state.users.filter(el => el.username.includes(this.state.to.username)) : this.state.filteredUsers;

        if (e.key === 'Enter') {
            this.setState({ filteredUsers: [], userError: false });
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const upperbound = filteredUsers.length - 1;
            const cases = {
                ArrowDown: activeIndex < upperbound ? activeIndex + 1 : activeIndex,
                ArrowUp: activeIndex > 0 ? activeIndex - 1 : activeIndex
            }
            this.setState({ activeIndex: cases[e.key], to: filteredUsers[cases[e.key]], filteredUsers });
        }
    }
    onMessageChange = (e) => {
        this.setState({ message: e.target.value });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const self = this;
        debugger;
        sendMessage(this.state.to, this.state.message)
            .then(res => {
                self.setState({ error: false, messageSent: true, message: '', to: { _id: 0, username: '' } })
                this.props.reload();
            }).catch(err => {
                self.setState({ error: true, messageSent: true })
            })
    }
    render() {
        return (
            <div className="add-message">
                <form action="" className="form" onSubmit={this.onSubmit}>
                    {
                        this.state.error && this.state.messageSent && <div className="form__error">unable to send message</div>

                    }{
                        !this.state.error && this.state.messageSent &&
                        <h3>Message sent successfully</h3>
                    }
                    <div className="form__input-group">
                        <div className="auto-complete">
                            <input type="text" className="form__input" value={this.state.to.username} placeholder="To" onChange={this.onChange} onKeyDown={this.autocompleteMove} />
                            <div className="auto-complete__items">
                                {this.state.filteredUsers.map((el, index) => <div key={el._id} className={index === this.state.activeIndex && 'active'}>{el.username}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="form__input-group">
                        <textarea className="form__input" placeholder="Message" value={this.state.message} onChange={this.onMessageChange} />
                    </div>
                    <div className="form__input-group">
                        <button className="btn--primary btn" disabled={this.state.userError}>Send</button>
                    </div>
                </form>

            </div>
        )
    }
}