import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";

import io from "socket.io-client";
import { getChatRooms, postMessage } from "../../service/products.service";
const socket = io("https://asm3-nodejs-me79.onrender.com", { transports: ["websocket"] });

function Chat(props) {
  const [allRoom, setAllRoom] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [room, setRoom] = useState({});

  function getAllChatRooms(id) {
    getChatRooms().then((r) => {
      if (r) {
        setAllRoom(r);
        console.log("id ", id);
        if (id) {
          const currentRoom = r?.find((room) => room.customerId === id);
          console.log("currentRoom ", currentRoom);
          setRoom(currentRoom);
        }
      }
    });
  }

  useEffect(() => {
    getAllChatRooms();
  }, []);

  // Hàm này dùng để load dữ liệu message và nó sẽ chạy lại khi state id_user2 thay đổi
  // Tức là khi admin chọn người dùng mà admin muốn chat thì state id_user2 sẽ thay đổi
  // để gọi lại hàm này
  useEffect(() => {
    setRoom(allRoom?.find((r) => r.customerId === roomId));
  }, [roomId]);

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
    socket.on("to_employee", (data) => {
      console.log("data ", data);
      getAllChatRooms(data.customerId);
      setRoomId(data.customerId);
    });

    socket.on("remove_room", (customerId) => {
      getAllChatRooms();
      console.log("customerId ", customerId);
      console.log("roomId ", roomId);
      setRoom({});
      setRoomId("");
    });
  }, []);

  // Hàm này dùng để gửi tin nhắn cho khách hàng
  function postMessagehandler(content) {
    if (!content?.trim()) return;
    inputEl.current.value = "";
    console.log("roomId roomId ", roomId);
    postMessage({
      message: {
        content,
        isCustomer: false,
      },
      customerId: roomId,
    }).then((r) => {
      if (r) {
        getAllChatRooms(roomId);
      }
    });
  }

  const handleRoomChange = (id) => {
    console.log("id ", id);
    setRoomId(id);
  };
  console.log("roomId ", roomId);
  const inputEl = useRef();
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Apps
                  </li>
                  <li
                    className="breadcrumb-item text-muted"
                    aria-current="page"
                  >
                    Chat
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="row no-gutters">
                <div className="col-lg-3 col-xl-2 border-right">
                  <div className="card-body border-bottom">
                    <form>
                      {/* <input
                        className="form-control"
                        type="text"
                        placeholder="Search Contact"
                      /> */}
                    </form>
                  </div>
                  <div
                    className="scrollable position-relative"
                    style={{ height: "calc(80vh - 111px)" }}
                  >
                    <ul className="mailbox list-style-none">
                      <li>
                        <div className="message-center">
                          {allRoom &&
                            allRoom.map((room, i) => (
                              <a
                                key={i}
                                onClick={() =>
                                  handleRoomChange(room.customerId)
                                }
                                className="message-item d-flex align-items-center border-bottom px-3 py-2 active_user"
                              >
                                <div className="user-img">
                                  {" "}
                                  <img
                                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                    alt="user"
                                    className="img-fluid rounded-circle"
                                    width="40px"
                                  />{" "}
                                  <span className="profile-status away float-right"></span>
                                </div>
                                <div className="w-75 d-inline-block v-middle pl-2">
                                  <h6 className="message-title mb-0 mt-1">
                                    {room._id}
                                  </h6>
                                </div>
                              </a>
                            ))}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-9  col-xl-10">
                  <div
                    className="chat-box scrollable position-relative"
                    style={{ height: "calc(80vh - 111px)" }}
                  >
                    <ul className="chat-list list-style-none px-3 pt-3">
                      {room?.message?.map((r, i) =>
                        !r.isCustomer ? (
                          <li
                            className="chat-item odd list-style-none mt-3"
                            key={i}
                          >
                            <div className="chat-content text-right d-inline-block pl-3">
                              <div className="box msg p-2 d-inline-block mb-1">
                                You: {r.content}
                              </div>
                              <br />
                            </div>
                          </li>
                        ) : (
                          <li
                            className="chat-item list-style-none mt-3"
                            key={i}
                          >
                            <div className="chat-img d-inline-block">
                              <img
                                src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                alt="user"
                                className="rounded-circle"
                                width="45"
                              />
                            </div>
                            <div
                              className="chat-content d-inline-block pl-3"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              <h6 className="font-weight-medium">
                                {room.customerName}
                              </h6>
                              <div className="msg p-2 d-inline-block mb-1">
                                Client: {r.content}
                              </div>
                            </div>
                            <div className="chat-time d-block font-10 mt-1 mr-0 mb-3"></div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="card-body border-top">
                    <div className="row">
                      <div className="col-9">
                        <div className="input-field mt-0 mb-0">
                          <input
                            id="textarea1"
                            placeholder="Type and enter"
                            className="form-control border-0"
                            type="text"
                            onKeyDown={(e) => {
                              if (e.key == "Enter") {
                                postMessagehandler(e.target.value);
                                e.target.value = "";
                              }
                            }}
                            ref={inputEl}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <a
                          className="btn-circle btn-lg btn-cyan float-right text-white"
                          onClick={() =>
                            postMessagehandler(inputEl?.current?.value)
                          }
                        >
                          <i className="fas fa-paper-plane"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center"></footer>
    </div>
  );
}

export default Chat;
