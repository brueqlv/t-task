import { useDispatch, useSelector } from 'react-redux';
import { fetchArtPieceByObjectNumber } from '../redux/artThunks';
import { RootState } from '../redux/store';
import { useEffect } from 'react';
import { AppDispatch } from '../redux/store'; 

export const useArtDetails = (objectNumber: string) => {
    const dispatch = useDispatch<AppDispatch>(); 
    const artDetail = useSelector((state: RootState) => state.art.artDetail);
    const status = useSelector((state: RootState) => state.art.status);
    const error = useSelector((state: RootState) => state.art.error);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                await dispatch(fetchArtPieceByObjectNumber(objectNumber)).unwrap();
            } catch (err) {
                console.error('Failed to fetch art details:', err);
            }
        };

        if (objectNumber && !artDetail) { 
            fetchDetails();
        }
    }, [objectNumber, artDetail, dispatch]);

    return { artDetail, status, error };
};

export default useArtDetails; 
