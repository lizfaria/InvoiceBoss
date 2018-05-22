import React from 'react';

const Header = (props) => {
    return (
        <header>
            <nav>
                <a href="" onClick={props.showCreate}>Create Account</a>
            </nav>
            <h1>Bob Ross</h1>
            <h3> Invoice Tracker </h3>
        </header>
    )
}


export default Header;