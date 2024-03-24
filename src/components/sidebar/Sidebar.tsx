"use client";
import Image from "next/image";
import "./Sidebar.css";
import { useContext, useState } from "react";
import { Context } from "@/context/context";
type Props = {};

const Sidebar = (props: Props) => {
  const [extended, setExtended] = useState(false);
  const{onSent,prevPrompt,setRecentPrompt} = useContext(Context);

  const loadPrompt = async(prompt:any) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Image
        onClick={() =>setExtended(!extended)}
          className="menu"
          src={"/images/menu_icon.png"}
          alt="menu icon"
          width={24}
          height={24}
        />
        <div className="new-chat">
          <Image
            className="new-chat-icon"
            src={"/images/plus_icon.png"}
            alt="new chat icon"
            width={24}
            height={24}
          />
          {extended ? <p>New Chat</p> : null}
        </div>
       {extended?  <div className="recent">
          <p className="recent-title">Recent</p>
          {
            prevPrompt.map((item,index)=>{
              return(
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                <Image
                  className="recent-icon"
                  src={"/images/message_icon.png"}
                  alt="recent icon"
                  width={24}
                  height={24}
                />
                <p>{item.slice(0,18)} ...</p>
              </div>
              )
            })
          }
        
        </div>:null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <Image
            className="bottom-icon"
            src={"/images/question_icon.png"}
            alt="chat icon"
            width={24}
            height={24}
          />
         {extended?  <p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <Image
            className="bottom-icon"
            src={"/images/history_icon.png"}
            alt="chat icon"
            width={24}
            height={24}
          />
          {extended? <p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <Image
            className="bottom-icon"
            src={"/images/setting_icon.png"}
            alt="chat icon"
            width={24}
            height={24}
          />
          {extended? <p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
