import React from 'react';
import bgImg from './Wallpaper.jpg';
import { UserForm } from '../User/Form';
import { Login } from '../User/Login';




export const HomeComponent = (props) => {
    // console.log(localStorage.getItem('chatApp'));
    return (

        <div className="home-cover" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="home-cover__section">
                <Login />
            </div>
            <div className="home-cover__section">
                <UserForm title="New here? Sign up" submitBtn="Sign up" />
            </div>
        </div>
    )
}