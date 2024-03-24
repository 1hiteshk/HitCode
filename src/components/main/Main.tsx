"use client";
import React, { useContext } from "react";
import "./Main.css";
import Image from "next/image";
import Card from "./Card";
import { Context, ContextType } from "@/context/context";

type Props = {};

const Main = (props: Props) => {
  const {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
  }: ContextType = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p className="font-bold">Hit Code</p>
        <Image
          className="user-image"
          src={"/images/shi.jpg"}
          height={50}
          width={50}
          alt="user"
        />
      </div>
      <div className="main-container">
        {!showResult ? 
        <>
 <div className="greet">
          <p>
            <span className="">Hello, Desktop.</span>
          </p>
          <p className="leading-tight">How can I assist you today ?</p>
        </div>
        <div className="cards">
          <Card
            tagline="Your friendly AI companion for creativity, knowledge, and conversation."
            imgName="compass_icon"
          />
          <Card
            tagline="Explore the depths of human interaction and innovation."
            imgName="bulb_icon"
          />
          <Card
            tagline="Your gateway to endless possibilities in language and beyond."
            imgName="message_icon"
          />
          <Card
            tagline="Join the conversation and shape the future of communication."
            imgName="code_icon"
          />
        </div>
        </> : <>
        <div className="result">
            <div className="result-title">
                <Image alt="user ra-one" src={'/images/raone.jpg'} width={30} height={30} 
                 style={{ width: "30px", height: "30px" }} // Maintain aspect ratio
                 />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <Image src={'/images/gemini_icon.png'} alt="" width={30} height={30} 
                 style={{ width: "auto", height: "auto" }} // Maintain aspect ratio
                 />
                 {loading?
                 <div className="loader">
                  <hr/>
                  <hr/>
                  <hr/>
                 </div>:<>
                 <p dangerouslySetInnerHTML={{__html:resultData}}></p></>}
                
            </div>
        </div>
        </>}
       

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter your search here"
            />
            <div>
              <Image
                src={"/images/gallery_icon.png"}
                alt="icon"
                height={24}
                width={24}
              />
              <Image
                src={"/images/mic_icon.png"}
                alt="icon"
                height={24}
                width={24}
              />
             {input? <Image
                onClick={() => onSent()}
                src={"/images/send_icon.png"}
                alt="icon"
                height={24}
                width={24}
              />:null}
            </div>
          </div>
          <p className="bottom-info">
            This may display inaccurate info, including about people, so
            double-check its responses.It's just an AI model.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
