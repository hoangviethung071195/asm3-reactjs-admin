import { globalSetting } from '../../service/global.service';

export function getFileUrl(fileId: string = '') {
  return globalSetting.storageApiEndpoint + '/' + fileId;
}