import Image from 'next/image'
import React from 'react';
import './Main.css';

type Props = {
    tagline:string;
    imgName:string;
}

const Card = ({tagline,imgName}: Props) => {
  return (
    <div>
         <div className="card">
                    <p>{tagline}</p>
                    <Image className='card-image' src={`/images/${imgName}.png`} height={24} width={24} alt='card'
                      style={{ width: "auto", height: "auto" }} // Maintain aspect ratio
                    />
                </div>
    </div>
  )
}

export default Card;