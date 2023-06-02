import React, {Component} from "react";
//const axios = require('axios');
import axios from "axios";

class LoginForm extends Component {

    state = {
        account: {
            username: "",
            password: "",
        },
        errors: {}
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        axios({
            method: 'post',
            url: 'http://localhost:3000/api/user/auth',
            data: {
                login: this.state.account.username,
                password: this.state.account.password
            }
        }).then((res) => {
            localStorage.setItem('token',
            res.data.token);
            console.log('success?');
            console.log(res);
        }).catch((err) => {
            const errors = {};
            errors.password = 'Given username doesn\'t exists or password is wrong!';
            this.setState({errors: errors || {}});
            console.log(err);
        });
    };

    handleChange = (e) => {
        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({account});
    }

    validate = () => {

        const errors = {};

        const {account} = this.state;
        if(account.username.trim() === '') {
            errors.username = 'Username is required!';
        }
        if(account.password.trim() === '') {
            errors.password = 'Password is required!';
        }

        return Object.keys(errors).length === 0 ? null : errors;
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">E-mail address</label>
                        <input name="username"
                            type="text"
                            className="form-control"
                            id="username"
                            aria-describedby="emailHelp"
                            placeholder="email.address@host.com"
                            value={this.state.account.username}
                            onChange={this.handleChange}/>
                            {this.state.errors.username &&
                            <div className="alert alert-danger">
                                {this.state.errors.username}
                            </div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input name="password"
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="password"
                            value={this.state.account.password}
                            onChange={this.handleChange}/>
                            {this.state.errors.password &&
                            <div className="alert alert-danger">
                                {this.state.errors.password}
                            </div>}
                    </div>
                    <button type="submit"
                        className="btn btn-primary">
                            Login
                        </button>
                </form>
            </div>
        )
    }
}

export default LoginForm;