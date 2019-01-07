import React from 'react';
import { Link,Redirect } from 'react-router-dom';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false,
            verified:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        const  { user } = this.state; 
        event.preventDefault();
        fetch("/api/account/signup",
        {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
        method:'POST',
        body:JSON.stringify({
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.username,
            password:user.password,
        })})
        .then(response => response.json())
        .then((response) => {
            if(response.success){
            alert('Registered')
            this.setState({ submitted: true });
            }
            else{
                alert('Some Error')
            }
        })
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        if (submitted){
            return (<Redirect to="/login"/>)
        }
        return (
            <div className ="container">
                <div className="col-md-6 col-md-offset-3">
                    <h2>Register</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                            {submitted && !user.firstName &&
                                <div className="help-block">First Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                            {submitted && !user.lastName &&
                                <div className="help-block">Last Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                            <label htmlFor="username">E-mail</label>
                            <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                            {submitted && !user.username &&
                                <div className="help-block">E-mail is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Register</button>
                            {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                    </form>
                    <Link to = '/login'>Already Registered, sign in.</Link>
                </div>
            </div>
        );
    }
}

export default RegisterPage;