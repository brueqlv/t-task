import React, { useState } from 'react';
import useArtPieces from '../hooks/useArtPieces';
import ArtPiece from './ArtPiece';
import Loading from './Loading';  
import Error from './Error';   
import './ArtGallery.scss';

const ArtGallery: React.FC = () => {
    const { displayedArtPieces, status, error, shuffleArt } = useArtPieces();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        const width = e.currentTarget.offsetWidth;
        const newIndex = Math.round(scrollLeft / width);
        setCurrentIndex(newIndex);
    };

    if (status === 'loading') return <Loading />; 
    if (status === 'failed') return <Error message={error || 'Something went wrong'} />;

    return (
        <div className='container'>
          <div className="art-gallery" onScroll={handleScroll}>
            {displayedArtPieces.map((piece, index) => (
                <ArtPiece key={piece.id} piece={piece} />
            ))}
          </div>
          <div className="pagination">
            {displayedArtPieces.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentIndex ? 'active' : ''}`}
              ></span>
            ))}
          </div>
          <button className='shuffle-btn' onClick={shuffleArt}>Shuffle</button>
        </div>
    );
};

export default ArtGallery;
