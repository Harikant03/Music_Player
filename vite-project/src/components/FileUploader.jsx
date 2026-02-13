import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploader = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files) => {
    const audioFiles = Array.from(files).filter(file =>
      file.type.startsWith('audio/')
    );

    if (audioFiles.length === 0) {
      alert("Bhai, sirf audio files hi upload ho sakti hain!");
      return;
    }

    const newSongs = audioFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      title: file.name.replace(/\.[^/.]+$/, ""),
      file: file,
      url: URL.createObjectURL(file),
      artist: "Unknown Artist",
      year: "2026",
      duration: "0:00"
    }));

    onUpload(newSongs);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <Box 
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      className={`relative p-10 border-2 border-dashed rounded-xl transition-all cursor-pointer mb-6
        ${dragActive ? 'border-green-500 bg-green-500/10' : 'border-gray-600 bg-[#121212]'}`}
    >
      <input 
        type="file" 
        multiple 
        accept="audio/*" 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="flex flex-col items-center gap-3">
        <CloudUploadIcon sx={{ fontSize: 50 }} className="text-gray-400" />
        <Typography variant="h6" className="text-gray-300">
          Drag & Drop Music here
        </Typography>
        <Typography variant="body2" className="text-gray-500 text-center">
          Only audio files are allowed
        </Typography>
      </div>
    </Box>
  );
};

export default FileUploader;
