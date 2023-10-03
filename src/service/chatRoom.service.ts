import { RoomModel } from '../models/Room.model';
import { CHAT_ROOM_PATH, PLURAL } from '../utils/constant/apiPath';
import { RequestMethod } from '../utils/constant/requestMethod';
import { requestJson } from '../utils/helpers/api';

export async function sendMessage(body: RoomModel) {
  return requestJson<RoomModel>(CHAT_ROOM_PATH + '/message', RequestMethod.Post, body);
}

export async function getChatRoom(id: string) {
  return requestJson<RoomModel>(CHAT_ROOM_PATH + id);
}

export async function getChatRooms() {
  return requestJson<RoomModel[]>(CHAT_ROOM_PATH + PLURAL);
}
