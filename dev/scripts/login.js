import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
                <div className="close">
                    <i className="fa fa-times"></i>
                </div>
                <form action="" onSubmit={this.createUser}>
                    <div>
                        <label htmlFor="createEmail">Email:</label>
                        <input type="text" name="createEmail" ref={ref => this.createEmail = ref} />
                    </div>
                    <div>
                        <label htmlFor="createPassword">Password:</label>
                        <input type="password" name="password" ref={ref => this.createPassword = ref} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} />
                    </div>
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }
}

export default Login;