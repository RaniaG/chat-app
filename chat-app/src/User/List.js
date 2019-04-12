import React from 'react';
import { UserCard } from './Card';
import { getAllUsers } from '../API/api';


export class UsersListing extends React.Component {
    state = {
        data: [],
        error: false
    }
    componentDidMount() {
        console.log("users mounted");
        const self = this;
        getAllUsers()
            .then(response => self.setState({ data: response.data }))
            .catch(err => self.setState({ error: true }));
    }
    render() {
        return (
            <div className="section">
                <div className="grid">
                    {this.state.data.map(el => (
                        <div className="grid__item">
                            <UserCard  {...el} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}