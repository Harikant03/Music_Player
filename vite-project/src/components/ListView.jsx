import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ListView = ({ songs, activeIndex, onPlay, setSongs }) => {

  const handleNameChange = (id, newName) => {
    const updatedSongs = songs.map(song => 
      song.id === id ? { ...song, title: newName } : song
    );
    setSongs(updatedSongs);
  };

  return (
    <TableContainer className="mt-6 bg-transparent">
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow className="border-b border-gray-800">
            <TableCell sx={{ color: '#888' }}>#</TableCell>
            <TableCell sx={{ color: '#888' }}>Title</TableCell>
            <TableCell sx={{ color: '#888' }}>Year</TableCell>
            <TableCell sx={{ color: '#888' }}>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow 
              key={song.id}
              onClick={() => onPlay(index)}
              className="hover:bg-white/5 group cursor-pointer transition-colors"
            >
              <TableCell sx={{ color: activeIndex === index ? "#22c55e" : "white" }}>
                {index + 1}
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2">
                  <TextField 
                    variant="standard"
                    value={song.title}
                    onChange={(e) => handleNameChange(song.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()} 
                    InputProps={{ 
                      disableUnderline: true,
                      style: { color: activeIndex === index ? "#22c55e" : "white" } 
                    }}
                  />
                  <EditIcon fontSize="small" sx={{ opacity: 0.3, color: 'white' }} />
                </div>
              </TableCell>

              <TableCell sx={{ color: '#888' }}>{song.year}</TableCell>
              <TableCell sx={{ color: '#888' }}>{song.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListView;