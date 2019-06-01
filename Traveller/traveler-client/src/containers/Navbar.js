import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from "../store/actions/auth";
import { fetchPosts } from "../store/actions/posts";

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMenuItems: false
        }
    }
    componentWillUpdate(){
        if(this.state.showMenuItems === true){
            this.setState({showMenuItems: false})
        }
    }
    logout = event => {
        event.preventDefault();
        this.props.logOut();
        this.props.history.push('/')
    };
    toOwnPosts = event => {
        event.preventDefault();
        this.props.fetchPosts(`/api/users/${this.props.currentUser.user.id}/posts`);
        this.props.history.push(`/users/${this.props.currentUser.user.id}/posts`);
    };
    handleHamburgerButton = () =>{
        if(!this.state.showMenuItems){
            this.setState({showMenuItems: true})
        } else {
            this.setState({showMenuItems: false})
        }
    };
    render(){
        const {currentUser} = this.props;
        return(
            <nav className="navigation">
                    <div className="navigation__hamburger" style={this.state.showMenuItems ? {height:"30rem"}: null} >
                        <div className="navigation__hamburger__item" onClick={this.handleHamburgerButton}><i className="fas fa-align-justify"/></div>
                        {this.state.showMenuItems &&
                            <ul className="navigation__list">
                                <li className="navigation__list--item"> <Link className="navigation__list--link" to="/">Traveller Blog</Link></li>
                                <li className="navigation__list--item"> <Link className="navigation__list--link" to="/contacts">Contact</Link></li>
                                {currentUser.isAuthenticated ? (
                                    <div className="navigation__list">
                                        <li className="navigation__list--item"><Link onClick={this.toOwnPosts} className="navigation__list--link" to={`/users/${currentUser.user.id}/posts`}>My stories</Link></li>
                                        <li className="navigation__list--item"><Link className="navigation__list--link" to={`/users/${currentUser.user.id}/posts/new`}>New Post </Link></li>
                                        <li className="navigation__list--item"><Link className="navigation__list--link" to='/' onClick={this.logout}>Log out</Link></li>
                                    </div>
                                ):(
                                        <div className="navigation__list">
                                            <li className="navigation__list--item"><Link className="navigation__list--link" to="/signin">Login</Link></li >
                                            <li className="navigation__list--item"><Link className="navigation__list--link" to="/signup">Sign up</Link></li>
                                        </div>
                                    )
                                }
                            </ul>
                        }

                    </div>
                    <div className="navigation__menu--left">
                        <ul className="navigation__list">
                            <li className="navigation__list--item"> <Link className="navigation__list--link" to="/">Traveller Blog</Link></li>
                            <li className="navigation__list--item"> <Link className="navigation__list--link" to="/contacts">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="navigation__menu--right">
                        {currentUser.isAuthenticated ? (
                            <ul className="navigation__list">
                                <li className="navigation__list--item"><Link onClick={this.toOwnPosts} className="navigation__list--link" to={`/users/${currentUser.user.id}/posts`}>My stories</Link></li>
                                <li className="navigation__list--item"><Link className="navigation__list--link" to={`/users/${currentUser.user.id}/posts/new`}>New Post </Link></li>
                                <li className="navigation__list--item"><Link className="navigation__list--link" to='/' onClick={this.logout}>Log out</Link></li>
                            </ul>
                            )
                            :(
                                <ul className="navigation__list">
                                    <li className="navigation__list--item"><Link className="navigation__list--link" to="/signin">Login</Link></li >
                                    <li className="navigation__list--item"><Link className="navigation__list--link" to="/signup">Sign up</Link></li>
                                </ul>
                            )}
                    </div>
            </nav>
        )
    }
}
function mapStateToProps(state) {
    return{
        currentUser: state.currentUser
    }
}
export default withRouter(connect(mapStateToProps, {logOut, fetchPosts})(Navbar));
