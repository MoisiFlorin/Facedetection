import React from 'react';
import './imageLink.css'


const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className= 'f3'>
                {'This Program will detect faces in your pictures.'}
            </p> 
            <p className= 'f3'>
                {'Give it a try: insert in the dialog box an image tab containing a face and click detect.'}
            </p> 
            <p className= 'f5'>
                {'Example: https://cdn.pixabay.com/photo/2017/03/17/04/07/beautiful-2150881__340.jpg'}
            </p> 
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
        
    );
}

export default ImageLinkForm;