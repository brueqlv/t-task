import { Route, Routes } from 'react-router-dom';
import ArtGallery from './components/ArtGallery';
import ArtDetail from './components/ArtDetail';
import Header from './components/Header';
import './App.scss';

function App() {
  return (
      <div className='main-container'>
        <Header />
          <Routes>
              <Route path="/" element={<ArtGallery />} />
              <Route path="/art/:id" element={<ArtDetail />} />
          </Routes>
      </div>
    );
}

export default App;