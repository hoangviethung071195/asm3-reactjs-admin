import { ImageList, ImageListItem } from '@mui/material';
import Container from '@mui/material/Container';
import ImageLoader from 'components/image-loader/ImageLoader';
import { FileUpload, FileUploadRemoveEvent, FileUploadSelectEvent } from 'primereact/fileupload';
import { PropsWithChildren, forwardRef, useRef, useState } from 'react';
import { getFileUrl } from 'utils/helpers/file';

const ImageInput = forwardRef<FileUpload, { fileIds: string[]; }>((props, ref) => {
  const { fileIds } = props;
  const [filesLength, setFilesLength] = useState(0);

  function onSelect(e: FileUploadSelectEvent) {
    setFilesLength(e.files.length);
  }
  function onClear() {
    setFilesLength(0);
  }
  function onRemove(e: FileUploadRemoveEvent) {
    setFilesLength(filesLength - 1);
  }

  return (
    <>
      <FileUpload ref={ref}
        name="files"
        multiple
        accept="image/*"
        maxFileSize={2 * 1024 * 1024}
        emptyTemplate={<p className="m-0 text-center">Drag and drop files to here to upload.</p>}
        onSelect={onSelect}
        onClear={onClear}
        onRemove={onRemove}
        chooseOptions={{ icon: 'fa fa-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' }}
        cancelOptions={{ icon: 'fa fa-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' }}
        pt={{
          uploadButton: {

          }
        }}
      />
      {
        !filesLength && <ImageList cols={4}>
          {fileIds.map((id) => (
            <ImageListItem key={id}>
              <ImageLoader fileId={id} fileIds={fileIds} />
            </ImageListItem>
          ))}
        </ImageList>
      }
    </>
  );
});

export default ImageInput;