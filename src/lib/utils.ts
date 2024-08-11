import { extname } from 'path';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const isWhiteSpaces = (_string: string): boolean => {
  return /^\s+$/.test(_string);
};

export const renameFile = (originalname: string): string => {
  const extensionName = extname(originalname);
  const name = originalname.split(extensionName)[0];

  return `${Date.now()}-${name}${extensionName}`;
};

export const uploadFile = async (file: File): Promise<string> => {
  let formdata = new FormData();

  formdata.append('files', file);

  const response = JSON.parse(
    await (
      await fetch('/api/file-upload', {
        method: 'POST',
        body: formdata,
      })
    ).text()
  );
  return `/uploads/${response.data}`;
};

export const handleFile = async (
  event: ChangeEvent<HTMLInputElement>,
  setTempImage: Dispatch<SetStateAction<string>>
) => {
  event.preventDefault();

  const fileReader = new FileReader();

  if (event.target.files?.length) {
    const file = event.target.files[0];

    if (!file.type.split('/').includes('image')) {
      return;
    }
    fileReader.readAsDataURL(file);
    setTempImage(await uploadFile(file));
  }
};
