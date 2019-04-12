import React from 'react';
import { changePassword } from '../API/api';


export class ChangePassword extends React.Component {

    state = {
        passwords: {
            password: "",
            newPassword: ""
        },
        error: false
    }
    onChange = (e) => {
        this.setState({ passwords: { ...this.state.passwords, [e.target.name]: e.target.value } });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const self = this;
        changePassword(this.state.passwords)
            .then(res => {
                self.props.close();
            }).catch(err => {
                self.setState({ passwords: { password: "", newPassword: "" }, error: true });
            })
    }
    close = () => {
        this.props.close();
    }
    render() {
        return (
            <>
                <form action="" className="form" onSubmit={this.onSubmit}>
                    {
                        this.state.error &&
                        <div className="form__error">Invalid passwords</div>
                    }
                    <div className="form__input-group">
                        <input type="password" className="form__input" placeholder="Old password" name="password" onChange={this.onChange} required />
                    </div>
                    <div className="form__input-group">
                        <input type="password" className="form__input" placeholder="New password" name="newPassword" onChange={this.onChange} required />
                    </div>
                    <div className="form__input-group">
                        <button className="btn--primary btn">Change</button>
                    </div>
                </form>
                <div className="form__input-group">
                    <button className="btn--primary btn" onClick={this.close}>Cancel</button>
                </div>
            </>
        )
    }
}