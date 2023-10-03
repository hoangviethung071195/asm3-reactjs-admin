import { GlobalSettingModel } from '../models/GlobalSetting.model';
import { requestJson } from '../utils/helpers/api';

export const globalSetting: GlobalSettingModel = {
  storageApiEndpoint: ''
};

let isLoaded = false;

export async function loadGlobalSettings() {
  if (isLoaded) {
    return globalSetting;
  }

  return requestJson<GlobalSettingModel>('/globalSetting').then(setting => {
    Object.assign(globalSetting, setting);
    isLoaded = true;
    return setting;
  });
}
