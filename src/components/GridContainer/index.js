import React, { useEffect, useRef, useState } from 'react';
import { array, func } from 'prop-types';
import ImageContainer from '../ImageContainer';
import './index.scss';

const GridContainer = ({ imagesList = [], addImagesToSlider, moreImagesList }) => {

    const [isLoading, setIsLoading] = useState(false);
    const gridRef = useRef(null);

    useEffect(() => {

        const gridElement = gridRef.current;

        const handleScrollBottom = async() => {
            if (gridElement.scrollHeight - gridElement.scrollTop === gridElement.clientHeight) {
                setIsLoading(true);

                try {
                    console.log("after is loading true")
                    await addImagesToSlider();
                }
                catch (err) {
                    alert('Couldnt load more: ", err');
                }
                finally {
                    setIsLoading(false);
                }
            }
        }

        gridElement.addEventListener('scroll', handleScrollBottom);

        return () => gridElement.removeEventListener('scroll', handleScrollBottom)
    });

    return (
        <div className="grid-container" ref={gridRef}>
            {imagesList.map((image, index) => (
                <ImageContainer key={`${index}-${image.likes}`}
                    {...image}/>
            ))}
            {moreImagesList.map((image, index) => (
                    <ImageContainer key={`${index}-${image.likes}`}
                        {...image}
                        isLoading={isLoading}/>
                ))
            }
        </div>
    );
};

GridContainer.propTypes = {
    displayImages: array,
    moreImagesList: array,
    addImagesToSlider: func
};

export default GridContainer;
