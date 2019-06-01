import React from 'react';
//import Gallery from 'react-grid-gallery';
import ImageGallery from 'react-image-gallery';

const GalleryComponent = ({postImageUrl}) =>{
    const IMAGES = [];
    // postImageUrl.map((element, index) => {
    //       IMAGES.push({
    //           src: element,
    //           thumbnail: element,
    //           thumbnailWidth: 320,
    //           thumbnailHeight: 174,
    //           isSelected: true
    //       })
    // });
    // return <Gallery images={IMAGES}/>
    postImageUrl.map(element =>{
        return IMAGES.push({
            original: element,
            thumbnail: element
        })
    });

    return <ImageGallery items={IMAGES}/>
};
export default GalleryComponent;