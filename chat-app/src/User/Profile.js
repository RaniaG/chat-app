import React from 'react';
import { getUserInfo } from '../API/api';
import { ChangePassword } from './ChangePassword';
import { UserForm } from './Form';

export class Profile extends React.Component {

    state = {
        user: {
            username: "",
            email: "",
            age: null,
            country: "",
            gender: ""
        },
        renderEdit: false,
        renderPassword: false
    }
    componentDidMount() {
        this.updateUserInfo();

    }
    updateUserInfo = () => {
        const self = this;
        getUserInfo()
            .then(res => self.setState({ user: res.data }))
    }
    renderEdit = (e) => {
        this.setState({ renderEdit: true });
    }
    closeEdit = () => {
        this.setState({ renderEdit: false });
        this.updateUserInfo();
    }
    closePassword = () => {
        this.setState({ renderPassword: false });
    }
    renderPassword = (e) => {
        this.setState({ renderPassword: true });
    }
    render() {
        const { username, email, age, country, gender } = this.state.user
        const { renderEdit, renderPassword } = this.state;
        return (
            <div className="profile">
                {
                    renderEdit &&
                    <div className="form-container">

                        <UserForm title="Edit your profile" submitBtn="Edit" user={this.state.user} edit={true} close={this.closeEdit} />
                    </div>

                }
                {
                    renderPassword && <ChangePassword close={this.closePassword} />
                }
                {
                    !(renderPassword || renderEdit) &&
                    <>
                        <div className="profile__title">
                            <div>
                                <div className="profile__username">{username}</div>
                                <div className="profile__email">{email}</div>
                            </div>
                            <div className="profile__controls">
                                <button className="btn btn--primary" onClick={this.renderEdit}>Edit profile</button>
                                <button className="btn btn--primary" onClick={this.renderPassword}>Change password</button>
                            </div>
                        </div>
                        <div className="profile__info">
                            <div>Age: <span className="profile__info__value">{age}</span></div>
                            <div>Country: <span className="profile__info__value">{country}</span></div>
                            <div>Gender: <span className="profile__info__value">{gender}</span></div>
                        </div>
                    </>
                }
            </div>
        )
    }
}