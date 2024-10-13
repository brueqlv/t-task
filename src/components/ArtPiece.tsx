import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchArtPieceByObjectNumber } from '../redux/artThunks';
import { useArtDetails } from '../hooks/useArtDetails';
import { ArtPieceProps } from '../redux/artCollectionTypes';
import { AppDispatch } from '../redux/store'; 
import Loading from './Loading';  
import Error from './Error';  
import './ArtPiece.scss';

const ArtPiece: React.FC<ArtPieceProps> = React.memo(({ piece }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {status, error } = useArtDetails(piece.objectNumber);

    if (status === 'loading') return <Loading />; 
    if (status === 'failed' || error != null) return <Error message={error || 'Something went wrong'} />;

    const handleClick = async () => {
        try {
            await dispatch(fetchArtPieceByObjectNumber(piece.objectNumber)).unwrap();
            navigate(`/art/${piece.id}`);
        } catch (error: unknown) {
            console.log('Failed to fetch art piece:', error);
            const errorMessage = (error as Error).message || 'Something went wrong';
            return <Error message={errorMessage} />;
        }
    };
    
    const handleImageLoad = () => {
        setIsLoading(false); 
    };

    return (
        <div className='small-frame' onClick={handleClick}>
            <div className={`image-container ${isLoading ? 'loading' : ''}`}>
                {piece.webImage && (
                    <img 
                        className={`image ${isLoading ? 'hidden' : ''}`} 
                        src={piece.webImage.url} 
                        alt={piece.title} 
                        onLoad={handleImageLoad}
                    />
                )}
            </div>
            <h2 className='image-title'>{piece.title}</h2>
        </div>
    );
});

export default ArtPiece;
