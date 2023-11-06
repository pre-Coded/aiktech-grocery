import React from 'react'
import { Addonbanner, TextHeading, Paragraph } from '../../Components'
import './Aboutus.scss'

export default function Aboutus() {
  return (
    <div>
        <Addonbanner heading="About Us" smallheading="Get your Grocery Delivered Instantly with Phurti Express"/>
        
        <div className='aboutus-contianer'>
            <div className='aboutus-image'>

            </div>
            <div className='aboutus-content'>
                <TextHeading heading="OUR MISSION" fontSize="1rem" />
                <TextHeading heading="Introduction" fontSize="2rem" fontWeight="bold"/>
                <br />
                <Paragraph text="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                " 
                lineHeight="2.5rem"
            />
            </div>
        </div>

        <div className='aboutus-contianer'>
            <div className='aboutus-content'>
                <TextHeading heading="OUR MISSION" fontSize="1rem" />
                <TextHeading heading="Introduction" fontSize="2rem" fontWeight="bold"/>
                <br />
                <Paragraph text="
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    " 
                lineHeight="2.5rem"
                />
            </div>
            <div className='aboutus-image'></div>
        </div>

        <div className='aboutus-card-contianer'>
            <TextHeading heading="OUR TEAM" fontSize="1rem" />
            <TextHeading 
                heading="Nullam aliquet turpis in massa aliquam porttitor" 
                fontSize="1.5rem" 
                fontWeight="bold" 
            />
            
            <div className='aboutus-card'>
                <div className='aboutus-card-content'></div>
                <div className='aboutus-card-content'></div>
                <div className='aboutus-card-content'></div>
                <div className='aboutus-card-content'></div>



            </div>

        </div>
        
    </div>
  )
}
