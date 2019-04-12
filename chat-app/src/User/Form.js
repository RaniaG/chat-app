import React from 'react';
import { checkUsername, signup, updateUserInfo } from '../API/api';
import { withRouter } from "react-router";


class userForm extends React.Component {

    constructor(props) {
        super(props);
        const { user } = this.props;
        this.state = {
            user: {
                username: user ? user.username : "",
                password: user ? user.password : "",
                age: user ? user.age : null,
                gender: user ? user.gender : "female",
                email: user ? user.email : "",
                country: user ? user.country : "n/a"
            },
            serverError: false,
            verifingUsername: false,
            validUsername: false,
            usernameUnchanged: false
        }
    }
    onChange = (formControl) => {
        return (e) => {
            this.setState({ user: { ...this.state.user, [formControl]: e.target.value } })
        }
    }
    onUsernameChange = (e) => {
        //check if name exists; in server
        this.setState({
            user: { ...this.state.user, username: e.target.value },
            verifingUsername: true,
            validUsername: false,
            usernameUnchanged: true
        });
        const self = this;
        checkUsername(e.target.value)
            .then((res) => {
                self.setState({ verifingUsername: false, validUsername: true });
            }).catch((e) => {
                self.setState({ verifingUsername: false });
            });

    }
    onSubmit = (e) => {
        e.preventDefault();
        const self = this;
        if (this.props.edit) {
            updateUserInfo(this.state.user)
                .then(res => {
                    self.props.close();
                }).catch(e => {
                    self.setState({ serverError: true });
                });
        }
        else {
            const { history } = this.props
            signup(this.state.user)
                .then(res => {
                    localStorage.setItem("chatApp", res.data);
                    history.push('/profile');
                }).catch(e => {
                    self.setState({ serverError: true });
                });
        }

    }
    close = () => {
        this.props.close();
    }
    render() {
        const { title, submitBtn, edit } = this.props;
        const { username, password, email, gender, age, country } = this.state.user;
        const { serverError, verifingUsername, validUsername, usernameUnchanged } = this.state;
        return (
            <>
                <form action="" className="form" onSubmit={this.onSubmit}>
                    {/* <div className="form"> */}
                    <div className="form__title">{title}</div>
                    {
                        serverError &&
                        <div className="form__error">Invalid data</div>
                    }
                    {
                        !validUsername && !verifingUsername && usernameUnchanged &&
                        <div className="form__error">Username already exists</div>
                    }
                    <div className="form__input-group">
                        <input type="text" className={`form__input ${validUsername ? "valid" : ""}`} value={username} placeholder="username" onChange={this.onUsernameChange} required />
                        {
                            verifingUsername && <div className="loader"></div>
                        }
                    </div>
                    <div className="form__input-group">
                        <input type="email" className="form__input" value={email} placeholder="email" onChange={this.onChange('email')} required />
                    </div>
                    <div className="form__input-group">
                        <input type="number" className="form__input" value={age} min="18" max="100" placeholder="age" onChange={this.onChange('age')} required />

                        <div className="form__input-group">
                            Gender:
                            <input type="radio" name="gender" value="female" checked={gender === 'female'} id="radio-female" onChange={this.onChange('gender')} required />
                            <label htmlFor="radio-female">Female</label>
                            <input type="radio" name="gender" value="male" checked={gender === 'male'} id="radio-male" onChange={this.onChange('gender')} required />
                            <label htmlFor="radio-male">Male</label>
                        </div>
                    </div>
                    <div className="form__input-group">
                        Country
                        <select value={country} onChange={this.onChange('country')}>
                            <option value="usa">USA</option>
                            <option value="uk">UK</option>
                            <option value="egypt">Egypt</option>
                            <option value="canada">Canada</option>
                            <option value="n/a">none</option>
                        </select>
                    </div>
                    {
                        !this.props.edit && <div className="form__input-group">
                            <input type="password" className="form__input" value={password} placeholder="password" onChange={this.onChange('password')} requried />
                        </div>
                    }
                    <div className="form__input-group">
                        <button className="btn--primary btn">{submitBtn}</button>
                    </div>
                    {/* </div> */}
                </form>
                {this.props.edit && <div className="form__input-group">
                    <button className="btn--primary btn" onClick={this.close}>Cancel</button>
                </div>}
            </>
        )
    }
}
export const UserForm = withRouter(userForm);