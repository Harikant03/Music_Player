import React, { useState } from 'react';
import { Button, Container, Typography, Stack } from '@mui/material';
import FileUploader from './components/FileUploader';
import ListView from './components/ListView';
import GridView from './components/GridView';
import Player from './components/Player';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isGridView, setIsGridView] = useState(false);

  const handleUpload = (newSongs) => {
    setSongs((prev) => [...prev, ...newSongs]);
  };

  const nextSong = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ bgcolor: '#2f2e2e', minHeight: '100vh', color: 'white', pb: 15 }}>
      <Typography variant="h4" sx={{ py: 4, fontWeight: 'bold', color: '#22c55e' }}>
        YouTube Music Clone
      </Typography>

      
      <FileUploader onUpload={handleUpload} />

      
      <Stack direction="row" justifyContent="flex-end" sx={{ my: 3 }}>
        <Button 
          variant="outlined" 
          onClick={() => setIsGridView(!isGridView)}
          sx={{ borderColor: '#22c55e', color: '#22c55e' }}
        >
          {isGridView ? 'Switch to List View' : 'Switch to Grid View'}
        </Button>
      </Stack>

      {isGridView ? (
        <GridView songs={songs} activeIndex={currentIndex} onPlay={setCurrentIndex} />
      ) : (
        <ListView songs={songs} activeIndex={currentIndex} onPlay={setCurrentIndex} setSongs={setSongs} />
      )}

      {currentIndex !== -1 && (
        <Player 
          currentSong={songs[currentIndex]} 
          onNext={nextSong} 
          onPrev={prevSong} 
        />
      )}
    </Container>
  );
}

export default App;
