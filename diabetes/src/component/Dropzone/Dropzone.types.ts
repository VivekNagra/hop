import { Accept } from 'react-dropzone';
export type DropzoneProps = {
  accept?: Accept;
  handleChange?: (file: File | File[]) => void;
  handleRemove?: () => void;
  height?: number | string;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  isRequired?: boolean;
  isMulti?: boolean;
  maxNoOfFiles?: number;
  label?: string;
  minFileSize?: number;
  maxFileSize?: number;
  name: string;
  placeholderComponent?: React.ReactNode;
  text?: string;
  width?: number | string;
  borderRadius?: number;
};
export type PlaceholderProps = {
  Heading: string;
};
export type PDFPreviewProps = {
  pdfUrl: string;
};
