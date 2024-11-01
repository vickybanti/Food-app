import Image from 'next/image';
import React, { useState } from 'react'

type ButtonProps = {
    type:'button' | 'submit';
    title:string;
    hover?:boolean;
    icon?:string;
    variant:string;
    full?:boolean;
    bg?:string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;}

const Button = ({bg,type,title,icon,variant,full,onClick}:ButtonProps) => {
  const [hover, setHover] = useState(true); // Start as true

  // Handlers for mouse events to update hover state
  const handleMouseEnter = () => {
    setHover(false);  // Set hover to false on hover
  };

  const handleMouseLeave = () => {
    setHover(true);   // Set hover to true when mouse leaves
  };

  
  return (
    <button 
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    // Dynamically apply classes
    className={`text-white py-4 px-8 rounded-md 
      ${hover && `hover:relative p-6 shadow-[5px_2px_0px_0px_rgba(255,255,255,0.7)]`} 
      ${variant} ${full && `w-full`} ${bg} transition-all`}    type={type} onClick={onClick}
      
   >
        {icon && <Image src={icon} alt={title} width={24} height={24} />}
        <label className='bold-16 whitespace-nowrap cursor-pointer'>{title}</label>
    </button>
  )
}

export default Button