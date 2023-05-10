import { useEffect, useState } from 'react';
import styles from './styles.module.css';

function Messages() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [message, setMessage] = useState(null);

  const showPeopleOnline = (onlineUsers: any[]) => {
    const people: any = {};
    onlineUsers.forEach(({ id, name }) => {
      people[id] = name;
    });

    console.log(people);
    setOnlineUsers([people]);
  };

  const selectContact = () => {
    setSelectedUser(1);
  };

  const sendMessage = async (evt: any) => {
    evt.preventDefault();

    const data = JSON.stringify({
      recipientId: selectedUser,
      text: 'message',
    });
    ws?.send(data);
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:7000/');
    setWs(ws);

    ws.addEventListener('message', (evt) => {
      const response = JSON.parse(evt.data);

      if (response.online) {
        showPeopleOnline(response.online);
      }
    });
  }, []);

  return (
    <>
      {selectedUser ? (
        <div className={styles.conversation}>
          <div className={styles.conversationField}>
            <div className={styles.message}>
              <img className={styles.messageImg} src="/Уня.jpg" alt="" width="30" height="30" />
              <div className="messageBody">
                <div className={styles.messageName}>Александр</div>
                <div className="text">Привет, как дела?</div>
              </div>
            </div>

            <div className={styles.message}>
              <img className={styles.messageImg} src="/Уня.jpg" alt="" width="30" height="30" />
              <div className="messageBody">
                <div className={styles.messageName}>Андрей</div>
                <div className="text">Привет, как дела?</div>
              </div>
            </div>

            <div className={styles.message}>
              <img className={styles.messageImg} src="/Уня.jpg" alt="" width="30" height="30" />
              <div className="messageBody">
                <div className={styles.messageName}>Андрей</div>
                <div className="text">Привет, как дела?</div>
              </div>
            </div>

            <div className={styles.message}>
              <img className={styles.messageImg} src="/Уня.jpg" alt="" width="30" height="30" />
              <div className="messageBody">
                <div className={styles.messageName}>Андрей</div>
                <div className="text">Привет, как дела?</div>
              </div>
            </div>

            <div className={styles.message}>
              <img className={styles.messageImg} src="/Уня.jpg" alt="" width="30" height="30" />
              <div className="messageBody">
                <div className={styles.messageName}>Андрей</div>
                <div className="text">Привет, как дела?</div>
              </div>
            </div>

            <div className={styles.message}>
              <img className={styles.messageImg} src="/Уня.jpg" alt="" width="30" height="30" />
              <div className="messageBody">
                <div className={styles.messageName}>Андрей</div>
                <div className="text">Привет, как дела?</div>
              </div>
            </div>
          </div>

          <form className={styles.textAreaWrapper} onSubmit={sendMessage}>
            <textarea className={styles.textArea} name="" id=""></textarea>
            <button type="submit">О</button>
          </form>
        </div>
      ) : (
        <div>
          <ul className={styles.list}>
            <li>
              <div className={styles.conversationPreview} onClick={selectContact}>
                <img
                  className={styles.partnerImg}
                  src="Уня.jpg"
                  alt="Иконка профиля"
                  width="50"
                  height="50"
                />

                <div className={styles.body}>
                  <p className={styles.partnerName}>Михаил иванов</p>

                  <div className={styles.innerBody}>
                    <img
                      className={styles.lastSenderImg}
                      src="Уня.jpg"
                      alt="Иконка профиля"
                      width="25"
                      height="25"
                    />
                    <p className={styles.lastMessage}>
                      Привет, как дела ? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Pariatur sint velit doloribus beatae, ipsum corporis quae provident impedit
                      esse sed officiis, facilis culpa consequuntur eos quasi animi? Earum, magnam
                      expedita.
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className={styles.conversationPreview} onClick={selectContact}>
                <img
                  className={styles.partnerImg}
                  src="Уня.jpg"
                  alt="Иконка профиля"
                  width="50"
                  height="50"
                />

                <div className={styles.body}>
                  <p className={styles.partnerName}>Михаил иванов</p>

                  <div className={styles.innerBody}>
                    <img
                      className={styles.lastSenderImg}
                      src="Уня.jpg"
                      alt="Иконка профиля"
                      width="25"
                      height="25"
                    />
                    <p className={styles.lastMessage}>
                      Привет, как дела ? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Pariatur sint velit doloribus beatae, ipsum corporis quae provident impedit
                      esse sed officiis, facilis culpa consequuntur eos quasi animi? Earum, magnam
                      expedita.
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}

      <div className={styles.conversationPanel}>panel</div>
    </>
  );
}

export default Messages;
