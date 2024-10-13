import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import Error from './Error';   
import './ArtDetail.scss';

const ArtDetail: React.FC = () => {
    const artDetail = useSelector((state: RootState) => state.art.artDetail);
    const navigate = useNavigate();

    return (
        <div className='container'>
            {artDetail ? (
                <div className='big-frame'>
                    <h2>{artDetail.title}</h2>
                    <img className='image' src={artDetail.webImage.url} alt={artDetail.title} />
                    <p>{artDetail.description}</p>
                </div>
            ) : (
                <Error message={'Something went wrong...'} />
            )}
            <button className='back-btn' onClick={() => navigate('/')}>Back to Gallery</button>
        </div>
    );
};

export default ArtDetail;
