import React from 'react';
import { Box } from '@chakra-ui/react';
import { PDFPreviewProps } from './Dropzone.types';

const PDFPreview: React.FC<PDFPreviewProps> = ({ pdfUrl }) => {
  return (
    <Box w="100%" h="400px" overflow="hidden" position="relative">
      <Box
        as="embed"
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-fit`}
        type="application/pdf"
        width="100%"
        height="100%"
        transform="scale(1.09)"
        style={{
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </Box>
  );
};

export default PDFPreview;
