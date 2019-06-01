import React from 'react';

const InputComponent = ({value, handleOnChangeImageUrl, handleOnClickDelete}) => {
    return(
        <div className="form__group">
            <input type="text"
                   value={value}
                   name="postImageUrl"
                   id="postImageUrl"
                   className="form__group--input"
                   placeholder="Image URL"
                   onChange={handleOnChangeImageUrl}
            />
            <label className="form__group--label" htmlFor="postImageUrl">Image URL</label>
            <span onClick={handleOnClickDelete}>X</span>
        </div>
    )
};
export default InputComponent;