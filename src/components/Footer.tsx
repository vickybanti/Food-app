import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='flexCenter border-t-2 lg:mx-15 xl:mx-15 bg-[#B78C56] font-sans font-medium text-white' style={{borderTopColor: '#741102', backgroundImage: 'url(/offerBg.png)'}}>
      <div className='flex flex-col w-full gap-10 lg:px-24 xl:px-24 md:px-14 sm:px-14 py-10 max-container'>
        <div className='flex flex-col items-start justify-center gap-[10%] md:flex-row'>
       
        <Link href="/">
          <Image src="/logo-bg.png" width={150} height={400} alt="logo"/>
        </Link>

          <div className='flex flex-wrap gap-10 sm:justify-between md:flex-1'>
            {FOOTER_LINKS.map((columns) => (
                <FooterColumn title={columns.title} key={columns.title}>
                <ul className='flex flex-col gap-4 text-gray-500 regular-14'>
                  {columns.links.map((link) => (
                    <Link href={link.value} key={link.label} className='transition-colors hover:text-gray-200'>
                      {link.label}
                    </Link>
                  ))}
                </ul>

              </FooterColumn>
            ))}
            <div className='flex flex-col gap-5'>
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link href="/" key={link.label} className='flex gap-4 md:flex-col lg:flex-row'>
                    <p className='text-white whitespace-nowrap'>
                      {link.label} : 
                    </p> 

                    <p className='text-gray-400 medium-14 whitespace-nowrap'>
                      {link.value}
                      </p> 
                    
                  </Link>
                ))}

              </FooterColumn>
            </div>

            <div className='flex flex-col gap-5'>
              <FooterColumn title={SOCIALS.title}>
                <ul className='flex gap-4 regular-14'>
                  {SOCIALS.links.map((link) => (
                    <Link href="/" key={link.icon}>
                      <Image 
                        src={link.icon} 
                        alt='logo' 
                        width={24} 
                        height={24} 
                        className={`hover:opacity-80 transition-opacity`}
                        style={{
                          textDecorationColor: `${link.color ? `invert(1) sepia(1) saturate(5) hue-rotate(${link.color}deg)` : 'none'}`
                        }}
                      />
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
        <div className='bg-gray-600 borfer'/>
        <p className='w-full font-sans text-center regular-14 text-gray-30'>2024 <span className="text-[#741102]">
        
         MoorePizza
        
          </span> | All rights reserved</p>
      </div>

    </footer>
  )
}

type FooterColumnProps = {
  title:string;
  children:React.ReactNode;
}

const FooterColumn = ({title, children}:FooterColumnProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <h4 className='bold-18 whitespace-nowrap'>{title}</h4>
    {children}
    </div>
  )
}


export default Footer
