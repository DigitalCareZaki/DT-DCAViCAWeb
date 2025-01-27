'use client';

import { useState, useCallback } from 'react';

import type { UseImagePickerProps } from './types';

const useImagePicker: UseImagePickerProps = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [uri, setUri] = useState<string | undefined>(undefined);

  const handleFilePicker = useCallback((accept = 'image/*') => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = accept;

    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (!file) return;
      setFile(file);

      const uri = URL.createObjectURL(file);
      setUri(uri);
    };

    fileInput.click();
  }, []);

  return [file, handleFilePicker, uri];
};

export default useImagePicker;
