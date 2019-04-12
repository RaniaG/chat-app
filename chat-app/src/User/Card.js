import React from 'react';

export const UserCard = (props) => {
    debugger;
    const { username } = props;
    return (
        <div className="user">
            <div className="user__name">{username}</div>
        </div>
    )
}