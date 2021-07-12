import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import GridContainer from '../GridContainer';
import './index.scss';

const Main = () => {

    const [imagesList, setImagesList] = useState([]);
    const [moreImagesList, setMoreImagesList] = useState([]);
    const loadImagesCounter = useRef(0);

    const fetchImages = async() => {
        try {
            const { data } = await axios.get('/fetch_images', { params: { load_counter: loadImagesCounter.current } });

            if (!data.length) return;

            if (loadImagesCounter.current === 0) {
                setImagesList([...imagesList, ...data])
            }
            else {
                setImagesList([...imagesList, ...moreImagesList])
                setMoreImagesList(data);
            }
        }
        catch (err) {
            alert('couldnt fetch images: ', err);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const addImagesToSlider = async() => {
        await fetchImages();
        loadImagesCounter.current += 1;
    }

    return (
        <div className="main">
            <h1>Images Slideshow</h1>
            <div className="content">
                <GridContainer addImagesToSlider={addImagesToSlider}
                    imagesList={imagesList}
                    moreImagesList={moreImagesList}/>
            </div>
        </div>
    );
};

export default Main;
