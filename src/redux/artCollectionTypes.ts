export interface WebImage {
    url: string;
}

export interface ArtObject {
    links: {
        self: string;
        web: string;
    };
    id: string;
    objectNumber: string;
    title: string;
    webImage: WebImage;
}

export interface ArtResponse {
    artObjects: ArtObject[];
}

export interface ArtPieceProps {
    piece: ArtObject;
}