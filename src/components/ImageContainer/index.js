import React, { useState } from 'react';
import { string, number, bool } from 'prop-types';
import defaultImage from './image_default.png';
import './index.scss';

const ImageContainer = ({ description, likes, url, isLoading }) => {

    const [onHover, setOnHover] = useState('');

    const onImageEnter = () => {
        setOnHover(true);
    };

    const onImageLeave = () => {
        setOnHover(false);
    };

    const imageUrl = isLoading ? defaultImage : url;
    const showDescription = description && !!description.length;

    return (
        <div className="image-container">
            {onHover && <div className="content">
                {!!likes && <p><b>Likes:</b> {likes}</p>}
                {showDescription && <p><b>Description:</b> {description}</p>}
            </div>}
            <img src={imageUrl} loading="lazy" className='image' alt={description} onMouseEnter={onImageEnter} onMouseLeave={onImageLeave}/>
        </div>
    );
};

ImageContainer.propTypes = {
    description: string,
    likes: number,
    ur: string,
    isLoading: bool
}

export default ImageContainer;
