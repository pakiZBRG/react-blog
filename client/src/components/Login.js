import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../actions/user'

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: []
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value});
    submitForm = e => {
        e.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password
        };

        if(this.isFormValid(this.state)){
            this.setState({error: []});
            this.props.dispatch(loginUser(data))
                .then(response => {
                    response.payload.login
                        ?
                    this.props.history.push('/')
                        :
                    this.setState({error: this.state.error.concat("Failed to login. Wrong password or email.")})
                })
        } else {
            this.setState({
                error: this.state.error.concat("Form is not valid")
            })
        }
    }

    isFormValid = ({email, password}) => email && password;

    displayErrors = error => error.map((err, i) => <p className='red-text text-darken-2' key={i}>{err}</p>)

    render() {
        return (
            <div className='container'>
                <h2>Login</h2>
                <div className='row'>
                    <form className='col s12' onSubmit={this.submitForm}>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input
                                    placeholder='Email Address'
                                    type='email'
                                    name='email'
                                    id="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    className='validate'
                                    />
                                <span
                                    className='helper-text'
                                    data-error='Insert valid email address'
                                    data-succes='Valid Email'
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input
                                    placeholder='Password'
                                    type='password'
                                    name='password'
                                    id="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    className='validate'
                                    />
                                <span
                                    className='helper-text'
                                    data-error='Insert valid password'
                                    data-succes='Valid Password'
                                />
                            </div>
                        </div>

                        {this.state.error.length > 0 && (
                            <div>
                                {this.displayErrors(this.state.error)}
                            </div>
                        )}

                        <div className='row'>
                            <div className='col 12'>
                                <button
                                    className='btn waves-effect red lighten-2'
                                    type='submit'
                                    name='action'
                                    onClick={this.submitForm}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {user: state.user}
}

export default connect(mapStateToProps)(Login);