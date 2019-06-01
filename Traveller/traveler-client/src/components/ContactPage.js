import React, {Component} from 'react';

class ContactPage extends Component {
   constructor(props){
       super(props);
       this.state = {
           message: ""
       }
   }
   onChangeHandler = event =>{
       this.setState({
           message: event.target.value
       })
   };
   onSubmitHandler = event =>{
       event.preventDefault();
       if(!this.props.currentUser.isAuthenticated){
           this.props.addMessage("Only authenticated users can leave feedback");
           return;
       }
       if(this.state.message === ""){
           this.props.addMessage( "Please type text");
           return;
       }
       this.props.addMessage( "Thank's for your feedback!");
       this.setState({
           message: ""
       })
   };
    render(){
        const{ message,  removeMessage } = this.props;
        this.props.history.listen(()=>{
            removeMessage();
        });
        return(
            <section className="contact-page-section">
                <div className="contact-page">
                    <h1 className="heading-primary u-text-center">If something went wrong or you have suggestion how to improve our blog platform, you can leave
                        your message bellow</h1>
                    {message.message &&(<div className="alert alert__success">{message.message}</div>)}
                    <form className="form" onSubmit={this.onSubmitHandler}>
                        <div className="form__group">
                            <textarea name="Leave your feedback"
                                      className="form__group--textarea"
                                      id="description"
                                      value={this.state.message}
                                      placeholder="Your Feedback"
                                      onChange={this.onChangeHandler}
                            />
                            <label className="form__group--label" htmlFor="description">Description</label>
                        </div>
                        <div className="add_post">
                            <button name="button" type="normal" className="btn btn--green">Send</button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }

}
export default ContactPage;