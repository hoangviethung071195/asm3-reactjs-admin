import { globalSetting } from '../../service/global.service';

export function getFileUrl(fileId: string = '') {
  return globalSetting.storageApiEndpoint + '/' + fileId;
}

export function getRelativeImageSrc(fileName: string) {
  return require('assets/images/' + fileName);
}