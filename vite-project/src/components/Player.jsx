import React, { useRef, useEffect, useState } from 'react';
import { Box, Slider, IconButton, Stack, Typography } from '@mui/material';
import { PlayArrow, Pause, SkipNext, SkipPrevious, MusicNote } from '@mui/icons-material';

const Player = ({ currentSong, onNext, onPrev }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback error:", err));
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!currentSong) return null;

  return (
    <Box className="fixed bottom-0 left-0 w-full bg-[#121212] p-4 border-t border-gray-800 z-50">
      <audio 
        ref={audioRef} 
        src={currentSong.url} 
        onEnded={onNext} 
      />
      
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center" className="w-1/4">
          <MusicNote className="text-green-500" />
          <Typography noWrap className="text-white font-medium">
            {currentSong.title}
          </Typography>
        </Stack>

        <Box className="flex flex-col items-center w-2/4">
          <Stack direction="row" spacing={2}>
            <IconButton onClick={onPrev} className="text-white hover:text-green-500">
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={togglePlay} className="text-white border border-white hover:border-green-500 hover:text-green-500">
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton onClick={onNext} className="text-white hover:text-green-500">
              <SkipNext />
            </IconButton>
          </Stack>
          <Slider 
            size="small" 
            defaultValue={0}
            sx={{ color: '#22c55e', width: '100%', mt: 1 }} 
          />
        </Box>

        <Typography variant="caption" className="text-gray-400 w-1/4 text-right">
          Queue List
        </Typography>
      </Stack>
    </Box>
  );
};

export default Player;