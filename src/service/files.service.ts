import { getArray } from '../utils/helpers/Array';
import { requestForm } from '../utils/helpers/api';

export function uploadFiles(files: FileList | File[]) {
  const formData = new FormData();
  getArray(files).forEach(f => formData.append('files', f));
  return requestForm<string[]>('/files/upload', formData);
}
