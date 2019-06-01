import React, {Component} from 'react';
import InputComponent from './InputComponent';

class PostForm extends Component{
    constructor(props){
        super(props);
        this.static = {
            MAX_IMAGES_QUANTITY: 10
        };
        this.state = {
            postName: '',
            description: '',
            postImageUrl: [],
        }
    }
    componentDidMount(){
        if(this.props.edit && this.props.posts.length>0) {
            this.setState((state, props) => ({
                postName: props.posts[0].postName,
                description: props.posts[0].description,
                postImageUrl: props.posts[0].postImageUrl
            }));
        }
    }
    addPost = () => {
        const post = ({postName: this.state.postName, description: this.state.description, postImageUrl: this.state.postImageUrl});
        const path = `/api/users/${this.props.currentUser.user.id}/posts`;
        this.props.addPostAction(path, post).then(()=>{
            this.props.history.push(`/users/${this.props.currentUser}/posts`);
        }).catch(()=>{
            return;
        })
    };
    editPost = () => {
        const path = `/api/users/${this.props.posts[0].user._id}/posts/${this.props.posts[0]._id}`;
        this.props.editPostAction(path, this.state).then(()=> {
            this.props.history.push(`/users/${this.props.posts[0].user._id}/posts/${this.props.posts[0]._id}`)
        }).catch(()=>{
            return;
        })
    };

    onSubmitHandler = event =>{
        event.preventDefault();
        this.props.edit ? this.editPost() : this.addPost()
    };
    handleOnChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    handleOnChangeImageUrl = idx => event =>{
        event.preventDefault();
        let urls = [...this.state.postImageUrl];
        urls[idx] = event.target.value;
        this.setState({postImageUrl: urls})
    };
    handleAppendInput = event => {
        event.preventDefault();
        this.state.postImageUrl.length <= this.static.MAX_IMAGES_QUANTITY
            ? this.setState({postImageUrl: [...this.state.postImageUrl, event.target.value]})
            : this.props.addError(`Not more than ${this.static.MAX_IMAGES_QUANTITY} photos`)
    };
    handleOnClickDelete = idx => event =>{
        event.preventDefault();
        // let arr = [...this.state.postImageUrl.slice(0, idx), ...this.state.postImageUrl.slice(idx+1)];
        let arr = [...this.state.postImageUrl.filter(e => e !== this.state.postImageUrl[idx])];
        this.setState({postImageUrl: arr});
    };
    render(){
        const {postName, description, postImageUrl} = this.state;
        const {heading, buttonText, errors, removeError, history} = this.props;
        const input = postImageUrl.map((element, index) => {
            return <InputComponent handleOnClickDelete={this.handleOnClickDelete(index)} key={index} handleOnChangeImageUrl={this.handleOnChangeImageUrl(index)} value={element}/>
        });
        history.listen(()=>{
            removeError();
        });
        return(
            <div>
                <div className="form-section">
                    <h2 className="secondary-heading u-text-center u-margin-bottom-large">{heading}</h2>
                    <form onSubmit={this.onSubmitHandler} className="form">
                        {errors.message &&(<div className="alert alert__danger">{errors.message}</div>)}
                        <div className="form__group">
                            <input type="text"
                                   name="postName"
                                   id="postName"
                                   className="form__group--input"
                                   value={postName}
                                   placeholder="Title"
                                   onChange={this.handleOnChange}
                            />
                            <label className="form__group--label" htmlFor="postName">Title</label>
                        </div>
                        {input}
                        <div className="add-image">
                            <a href="#" name="button" type="normal" className="btn-text-small btn-text" onClick={this.handleAppendInput}>Add image</a>
                        </div>
                        <div className="form__group">
                            <textarea name="description"
                                      className="form__group--textarea"
                                      id="description"
                                      value={description}
                                      placeholder="Description"
                                      onChange={this.handleOnChange}
                            />
                            <label className="form__group--label" htmlFor="description">Description</label>
                        </div>
                        <div className="add_post">
                            <button name="button" type="normal" className="btn btn--green">{buttonText}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default PostForm;