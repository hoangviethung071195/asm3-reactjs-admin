import { cloneDeep } from 'lodash';
import { UserModel } from 'models/User.model';
import { PropsWithChildren, useEffect, useReducer, useRef, useState } from "react";
import { getUsers } from 'service/users.service';
import { io } from "socket.io-client";
import { scrollToBotomEl } from 'utils/helpers/browser';
import { getMsgTime, getRelativeTime } from 'utils/helpers/date';
import { RoomModel } from '../../models/Room.model';
import { getChatRooms, sendMessage } from '../../service/chatRoom.service';
import { API_ENDPOINT } from '../../utils/constant/env';
import { initialRoom } from '../../utils/constant/models/room';
const socket = io(API_ENDPOINT, { transports: ["websocket"] });

function Customer(props: PropsWithChildren) {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<UserModel[]>([]);
  const chatboxBodyRef = useRef<HTMLDivElement>(null);
  const [roomInfo, dispatchRoomInfo] = useReducer((prevState: {
    list: RoomModel[];
    room: RoomModel;
  }, payload: {
    selectedId?: string;
    updateList?: RoomModel[];
    updateRoom?: RoomModel;
    deletedId?: string;
  }) => {
    const { selectedId, deletedId, updateList, updateRoom } = payload;
    const state = cloneDeep(prevState);
    if (updateList) {
      state.list = updateList;
    }

    if (updateRoom) {
      const index = state.list.findIndex(r => r._id === updateRoom._id);
      if (index >= 0) {
        state.list[index] = updateRoom;
        if (state.room._id === updateRoom._id) {
          state.room = updateRoom;
        }
      } else {
        state.list.push(updateRoom);
      }
    }

    if (deletedId) {
      state.list = state.list.filter(r => r._id !== deletedId);
    }

    if (selectedId) {
      const selectedRoom = state.list.find(r => r._id === selectedId);
      if (selectedRoom) {
        state.room = selectedRoom;
      }
    }

    const prevRoomId = state.room._id;
    const isRoomExisted = state.list.some(r => r._id === prevRoomId);
    if (!prevRoomId || !isRoomExisted) {
      state.room = state.list.at(0) || initialRoom;
    }
    return state;
  }, {
    list: [],
    room: initialRoom
  });

  useEffect(() => {
    Promise.all([
      getChatRooms(),
      getUsers()
    ]).then(([roomsRes, usersRes]) => {
      if (roomsRes) {
        dispatchRoomInfo({ updateList: roomsRes });
        scrollToBottomChatBox();
      }
      setUsers(usersRes.list);
    });

    socket.on("to_employee", (data: RoomModel) => {
      dispatchRoomInfo({ updateRoom: data });
      scrollToBottomChatBox();
    });

    socket.on("delete_room", (deletedId: string) => {
      dispatchRoomInfo({ deletedId });
    });
  }, []);

  function postMessagehandler(content = '') {
    if (!content?.trim()) return;
    setMessage('');
    const newMsg = {
      content,
      isCustomer: false,
      createdAt: '',
    };
    sendMessage({
      message: [newMsg],
      customerId: roomInfo.room.customerId,
    }).then(updateRoom => {
      dispatchRoomInfo({ updateRoom });
      scrollToBottomChatBox();
    });
  }

  function changeRoomHandler(id = '') {
    const changedRoom = roomInfo.list.find(r => r._id === id);
    if (!changedRoom) return;
    dispatchRoomInfo({ selectedId: changedRoom._id });
    scrollToBottomChatBox();
  };

  function scrollToBottomChatBox() {
    setTimeout(() => {
      scrollToBotomEl(chatboxBodyRef.current);
    });
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card" id="chat3"
            style={{
              borderRadius: '15px'
            }}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0" style={{
                  background: 'linear-gradient(to bottom right, rgb(255 255 255 / 20%), rgb(166 156 255 / 20%))',
                  boxShadow: '10px 10px 10px rgba(46, 54, 68, 0.03)',
                  borderRadius: '10px'
                }}>
                  <div className="p-3">
                    {/* <div className="input-group rounded mb-3">
                      <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                        aria-describedby="search-addon" />
                      <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                      </span>
                    </div> */}
                    <div data-mdb-perfect-scrollbar
                      className="perfect-scrollbar ps ps--active-y"
                      style={{
                        position: 'relative',
                        height: '400px',
                        overflow: 'auto'
                      }}
                    >
                      <ul className="list-unstyled mb-0">
                        {roomInfo.list?.map((room, i) => (
                          <li key={i} className="p-2 border-bottom">
                            <div className="d-flex justify-content-between text-primary"
                              style={{
                                cursor: 'pointer'
                              }}
                              onClick={() =>
                                changeRoomHandler(room._id)
                              }
                            >
                              <div className="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                    alt="avatar" className="d-flex align-self-center me-3" width="60" />
                                  <span className="badge bg-success badge-dot"></span>
                                </div>
                                <div className="pt-1">
                                  <p className="fw-bold mb-0" style={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '115px'
                                  }}>{users.find(u => u._id === room.customerId).fullName}</p>
                                  <p className="small text-muted">{room.message.filter(m => m.isCustomer).at(-1).content}</p>
                                </div>
                              </div>
                              <div className="pt-1">
                                <p className="small text-muted mb-1 ms-2" style={{ minWidth: '78px' }}>
                                  {getRelativeTime(room.message.at(-1).createdAt)}
                                </p>
                                <span className="badge bg-danger rounded-pill float-end">{room.message.filter(m => m.isCustomer).length}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-7 col-xl-8">
                  <div ref={chatboxBodyRef} className="pt-3 pe-3" data-mdb-perfect-scrollbar="true"
                    style={{
                      position: 'relative',
                      height: '400px',
                      overflow: 'auto',
                    }}
                  >
                    {roomInfo.room.message.map((r, i) =>
                      !r.isCustomer ? (
                        <div key={i} className="d-flex flex-row justify-content-end">
                          <div>
                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"> {r.content}</p>
                            <p className="small me-3 mb-3 rounded-3 text-muted">{getMsgTime(r.createdAt)}</p>
                          </div>
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="avatar 1"
                            style={{
                              width: '45px',
                              height: '100%'
                            }}
                          />
                        </div>
                      ) : (
                        <div key={i} className="d-flex flex-row justify-content-start">
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                            alt="avatar 1"
                            style={{
                              width: '45px',
                              height: '100%'
                            }}
                          />
                          <div>
                            <p className="small p-2 ms-3 mb-1 rounded-3"
                              style={{
                                backgroundColor: '#f5f6f7',
                              }}
                            >
                              {r.content}
                            </p>
                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{getMsgTime(r.createdAt)}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="avatar 3"
                      style={{
                        width: '40px',
                        height: '100%'
                      }}
                    />
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleFormControlInput2"
                      placeholder="Type message"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const text = e.currentTarget.value.trim();
                          postMessagehandler(text);
                          setMessage('');
                        }
                      }}
                      onChange={(e) => {
                        const text = e.currentTarget.value;
                        setMessage(text);
                      }}
                      value={message}
                      style={{
                        border: 'none',
                        boxShadow: 'none',
                        fontSize: '1rem',
                        minWidth: '50px'
                      }}
                    />
                    <div className="ms-1 text-muted"><i className="fas fa-paperclip"></i></div>
                    <div className="ms-3 text-muted"><i className="fas fa-smile"></i></div>
                    <div className="ms-3 text-primary"
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        postMessagehandler(message)
                      }
                    >
                      <i className="fas fa-paper-plane"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
