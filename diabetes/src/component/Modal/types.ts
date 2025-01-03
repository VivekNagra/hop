import React from 'react';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  childBodyPaddingX?: number;
  childBodyPaddingY?: number;
  limitChildOverflow?: boolean;
  isLoading?: boolean;
  cancelButtonLabel?: string;
  submitButtonLabel?: string;
  showSubmitButton?: boolean;
  onSubmit?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'full';
  isDisabled?: boolean;
};

export type DeleteModalProps = ModalProps & { title?: string };
