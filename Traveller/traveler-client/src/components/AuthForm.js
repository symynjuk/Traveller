import React, { Component } from 'react';

class AuthForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            profileImageUrl: '',
            password: ''
        }
    }
    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    onSubmitHandler = event => {
        event.preventDefault();
        const type = this.props.signed ? 'signup' : 'signin';
        this.props.authUser(type, this.state).then(()=>{
            this.props.history.push('/');
        }).catch(()=>{
            return;
        });
        this.setState({
            username: '',
            email: '',
            password: '',
            profileImageUrl: ''
        })
    };
    render(){
        const {buttonText, heading, signed, errors, removeError, history} = this.props;
        const {username, email, password, profileImageUrl} = this.state;
        history.listen(()=>{
            removeError();
        });
        return(
            <div>
                <section className="auth-section">
                    <div className="auth">
                        <h2 className="secondary-heading u-text-center">{heading}</h2>
                        {errors.message &&(<div className="alert alert__danger u-text-center u-margin-bottom-medium">{errors.message}</div>)}
                            <form onSubmit={this.onSubmitHandler} className="auth__form">
                                <div className="form__group">
                                    <input type="email"
                                           name="email"
                                           id="email"
                                           className="form__group--input"
                                           value={email}
                                           placeholder="Email"
                                           onChange={this.handleOnChange}
                                    />
                                    <label className="form__group--label" htmlFor="email">Email</label>
                                </div>
                                <div className="form__group">
                                    <input type="password"
                                           name="password"
                                           id="password"
                                           className="form__group--input"
                                           value={password}
                                           placeholder="Password"
                                           onChange={this.handleOnChange}
                                    />
                                    <label className="form__group--label" htmlFor="password">Password</label>
                                </div>
                                {signed && (
                                    <div>
                                        <div className="form__group">
                                            <input type="text"
                                                   name="username"
                                                   id="username"
                                                   className="form__group--input"
                                                   value={username}
                                                   placeholder="Username"
                                                   onChange={this.handleOnChange}
                                            />
                                            <label className="form__group--label" htmlFor="username">Username</label>
                                        </div>
                                        <div className="form__group">
                                            <input type="text"
                                                   name="profileImageUrl"
                                                   id="profileImageUrl"
                                                   className="form__group--input"
                                                   value={profileImageUrl}
                                                   placeholder="Profile Image URL"
                                                   onChange={this.handleOnChange}
                                            />
                                            <label className="form__group--label" htmlFor="profileImageUrl">Profile Image URL</label>
                                        </div>
                                    </div>
                                    )}
                                <div className="form__button">
                                    <button name="button" type="normal" className="btn btn--green">{buttonText}</button>
                                </div>
                            </form>
                        </div>
                </section>
            </div>
        )
    }
}

export default AuthForm;