"use client"
import runChat from "@/config/gemini";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const Context = createContext({} as ContextType);

export type ContextType = {
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    recentPrompt: string;
    setRecentPrompt: Dispatch<SetStateAction<string>>;
    prevPrompt: any[]; // You may want to replace `any[]` with a more specific type
    setPrevPrompt: Dispatch<SetStateAction<any[]>>;
    showResult: boolean;
    setShowResult: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    resultData: string;
    setResultData: Dispatch<SetStateAction<string>>;
    onSent: (prompt: any) => Promise<void>;
  };

const ContextProvider = (props: any) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState<any[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index:any,nextWord:any) => {
        setTimeout(function(){
            setResultData(prev=>prev + nextWord)
        },75*index)
    }

    

    const onSent = async (prompt:any) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
          response = await runChat(prompt);
          setRecentPrompt(prompt)
        } else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
       
        let responseArray = response.split("**");
        let newResponse:any="";
        for(let i=0;i<responseArray.length;i++) {
            if(i===0||i%2 !==1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++) {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setResultData(newResponse2)
        setLoading(false)
        setInput("")

    }
    

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;