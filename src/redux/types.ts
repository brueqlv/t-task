import { ArtObject} from './artCollectionTypes';
import { ArtObjectDetail} from './artDetailsTypes'

export interface ArtState {
    artPieces: ArtObject[];
    artDetail: ArtObjectDetail | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    displayedArtPieces: ArtObject[];
}