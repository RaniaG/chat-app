import React from 'react';
import { login } from '../API/api';
import { withRouter } from "react-router";



class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: ""
            },
            error: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } });
    }
    onSubmit(e) {
        e.preventDefault();

        // debugger;
        const { history } = this.props
        const self = this;
        login(this.state.user)
            .then(function (response) {
                localStorage.setItem("chatApp", response.data);
                history.push('/profile');
            })
            .catch(function (error) {
                debugger;
                self.setState({ error: true });
            });
    }

    render() {
        return (
            <form action="" className="form" onSubmit={this.onSubmit}>
                <div className="form__title">Already have an Account?</div>
                {
                    this.state.error && <div className="form__error" >Invalid username or password</div>
                }
                <div className="form__input-group">
                    <input type="text" value={this.state.user.username} className="form__input" placeholder="username" name="username" onChange={this.onChange} required />
                </div>
                <div className="form__input-group">
                    <input type="password" value={this.state.user.password} className="form__input" placeholder="password" name="password" onChange={this.onChange} required />
                </div>
                <div className="form__input-group">
                    <button className="btn--primary btn">Login</button>
                </div>
            </form>

        )
    }
}
export const Login = withRouter(LoginComponent);