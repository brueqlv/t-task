import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ArtObject, ArtResponse } from './artCollectionTypes';
import { ArtObjectDetail } from './artDetailsTypes';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
const IMAGE_COUNT = process.env.REACT_APP_IMAGE_COUNT;

export const fetchArtPieces = createAsyncThunk<ArtObject[], void>('art/fetchArtPieces', async () => {
    console.log("Fetching art pieces");
    const response = await axios.get<ArtResponse>(`${API_URL}`, {
        params: {
            key: API_KEY,
            type: 'painting',
            ps: IMAGE_COUNT,
            imgonly: true,
        }
    });
    return response.data.artObjects;
});

export const fetchArtPieceByObjectNumber = createAsyncThunk<ArtObjectDetail, string>(
    'art/fetchArtPieceById',
    async (objectNumber) => {
        console.log("Fetching art piece");
        const response = await axios.get<any>(`${API_URL}/${objectNumber}`, {
            params: { key: API_KEY }
        });
        return response.data.artObject;
    }
);
