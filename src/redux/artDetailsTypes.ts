export interface DetailWebImage {
    url: string;
  }
  
  export interface ArtObjectDetail {
    title: string; 
    description: string; 
    webImage: DetailWebImage; 
  }
  
  export interface ArtDetailResponse {
    artObject: ArtObjectDetail; 
  }