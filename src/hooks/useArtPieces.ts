import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchArtPieces } from '../redux/artThunks';
import { AppDispatch } from '../redux/store'; 
import { ArtObject } from '../redux/artCollectionTypes';

const useArtPieces = () => {
    const dispatch = useDispatch<AppDispatch>(); 
    const { artPieces, status, error } = useSelector((state: RootState) => state.art);
    const [displayedArtPieces, setDisplayedArtPieces] = useState<ArtObject[]>([]);
    const [hasShuffled, setHasShuffled] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchArtPieces());
        }
    }, [dispatch, status]);

    const shuffleArt = () => {
        if (artPieces.length > 0) {
            const shuffled = [...artPieces].sort(() => 0.5 - Math.random()).slice(0, 3);
            setDisplayedArtPieces(shuffled);
            setHasShuffled(true); 
        }
    };

    useEffect(() => {
        if (status === 'succeeded' && !hasShuffled) {
            shuffleArt();
        }
    }, [status, hasShuffled]); 

    return { displayedArtPieces, status, error, shuffleArt };
};

export default useArtPieces;
