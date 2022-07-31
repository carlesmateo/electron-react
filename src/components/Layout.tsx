import { IpcRendererEvent } from "electron";
import React, { useEffect, useState } from "react";

export const Layout = () => {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    (async () => {
      const newMsgs = await window.Main.getMsgs();
      setMsgs(newMsgs);
    })();

    window.Main.onMsg((event: IpcRendererEvent, msg: string) => {
      setMsgs((currMsgs) => [...currMsgs, msg]);
    });
  }, []);

  const sendMsg = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    window.Main.sendMsg(form.msg.value);
  };

  return (
    <div>
      <form onSubmit={sendMsg}>
        <input type="text" name="msg" />
        <button>Send </button>
      </form>
      {msgs.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
    </div>
  );
};
