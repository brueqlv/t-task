import { createSlice } from '@reduxjs/toolkit';
import { ArtState } from './types';
import { fetchArtPieces, fetchArtPieceByObjectNumber } from './artThunks';

const initialState: ArtState = {
    artPieces: [],
    artDetail: null,
    status: 'idle',
    error: null,
    displayedArtPieces: [],
};

const artSlice = createSlice({
    name: 'art',
    initialState,
    reducers: {
        shuffleArt: (state) => {
            if (state.artPieces.length > 0) {
                const shuffled = [...state.artPieces].sort(() => 0.5 - Math.random()).slice(0, 3);
                state.displayedArtPieces = shuffled;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtPieces.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArtPieces.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.artPieces = action.payload;
            })
            .addCase(fetchArtPieces.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch data';
            })
            .addCase(fetchArtPieceByObjectNumber.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArtPieceByObjectNumber.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.artDetail = action.payload;
            })
            .addCase(fetchArtPieceByObjectNumber.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch art piece';
            });
    }
});

export const { shuffleArt } = artSlice.actions;
export default artSlice.reducer;
