import { FormEventHandler, useState } from 'react';
import styles from './styles.module.css';

function Messages() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const sendMessage: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    const data = JSON.stringify({
      recipientId: selectedUser,
      text: 'message',
    });

    ws?.send(data);
  };

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
              <div className={styles.conversationPreview}>
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
              <div className={styles.conversationPreview}>
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

      <div className={styles.friendsPanel}>Тут будет список друзей</div>
    </>
  );
}

export default Messages;
