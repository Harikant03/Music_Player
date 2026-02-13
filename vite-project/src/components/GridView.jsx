import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const GridView = ({ songs, activeIndex, onPlay }) => {
  return (
    <Box sx={{ flexGrow: 1, paddingY: 4 }}>
      <Grid container spacing={3}>
        {songs.map((song, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
            <Card 
              onClick={() => onPlay(index)}
              className={`cursor-pointer transition-all duration-300 bg-[#181818] hover:bg-[#282828] border-2 
                ${activeIndex === index ? 'border-green-500 scale-105' : 'border-transparent'}`}
            >
              <Box 
                className="aspect-square flex items-center justify-center bg-[#222] relative"
                sx={{ overflow: 'hidden' }}
              >
                <MusicNoteIcon sx={{ fontSize: 80 }} className="text-gray-700" />
                
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-black border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                )}
              </Box>

              <CardContent>
                <Typography 
                  variant="body1" 
                  noWrap 
                  className={`font-bold ${activeIndex === index ? 'text-green-500' : 'text-white'}`}
                >
                  {song.title}
                </Typography>
                
                <Typography variant="body2" className="text-gray-400 mt-1">
                  {song.artist} • {song.year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GridView;
