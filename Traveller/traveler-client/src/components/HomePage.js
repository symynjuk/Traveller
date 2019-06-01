import React from 'react';
import {Link} from 'react-router-dom';

const Homepage = () =>{
    return(
        <div className="welcome-page">
            <div className="landing-header">
                <h1 className="heading-primary landing-header__text">outdoors is where life begins for travellers</h1>
                <Link to="/posts" className="btn btn--white">Enter Blog</Link>
            </div>
            <ul className="slideshow">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
};
export default Homepage;