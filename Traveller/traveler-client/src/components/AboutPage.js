import React from 'react';

const AboutPage = () => {
    return(
        <div>
            <section>
                <div id="about_img_main">
                    <div className="container">
                        <h1 className="text_container">About</h1>
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="heading_text">
                    <h2> Hi Travelers </h2>
                         <div className="horithontal_line"></div>
                 </div>
             <div className="about">
                <p className="left_animate">I’m not going to lie: I think I have a pretty good travel blog. (You probably do too
                    if you’re here.) I work hard to provide excellent practical travel advice to help you travel better, but I’m
                    not the only great travel blogger out there. In fact — and I know this might be shocking — there’s a lot
                    about travel that I’m not an expert on. Family travel? No idea. Travel as a woman? Clueless. Information on
                    hotels? Only a little. Photography? I can manage to turn my camera on if that counts. Food expert? Only at
                    eating it.</p>
                <br/><p className="right_animate">I’ve realized that it’s been a while since I last talked about the best travel
                    blogs out there – the ones I read – so I wanted to take a moment and highlight some of my favorite travel
                    blogs that can also help you travel better, cheaper, and smarter. There are so many good blogs out there, I
                    feel like I’m long overdue to point you to some of them:</p>
                    <br/><p className="left_animate">Besides being one of my all-time favorite people in the world, Jodi is also
                    a damn amazing blogger who writes often about food and culture. She devotes a lot of time to food on the
                    road, taking mouthwatering photos that make me jealous of her ability to do so. A former lawyer, she
                    also writes a series called “Thrillable Hours” about other lawyers who gave up being a corporate lackey
                    for life on the road.</p>
                <img className="about_text_img" src="../images/about.jpg" alt="" />
                    <p className="right_animate">Besides being one of my all-time favorite people in the world, Jodi is
                        also a damn amazing blogger who writes often about food and culture. She devotes a lot of time
                        to food on the road, taking mouthwatering photos that make me jealous of her ability to do so. A
                        former lawyer, she also writes a series called “Thrillable Hours” about other lawyers who gave
                        up being a corporate lackey for life on the road.</p>
             </div>
            </section>
            <section id="quote">
                <span className="quote">– “Life is either a daring adventure or <br/> nothing at all.” – Helen Keller.</span>
            </section>
        </div>
    )
};
export default AboutPage