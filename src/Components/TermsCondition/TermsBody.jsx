import React from 'react'

import './terms.css'

const TermsBody= ()=> {
    return (
        <div className='container'>
            <h1 className="heading">Terms & Conditions</h1>
            <ol className='list-container'>
                <li className="list-items">
                Lorem Ipsum is simply dummy text of the printing and typesetting industries.
                </li>
                <li className="list-items">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </li>
                <li className="list-items">
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </li>
                <li className="list-items">
                It has survived not only five centuries, but also the leap into electronic typesetting,
                </li>
                <li className="list-items">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                </li>
                <li className="list-items">
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                </li>
            </ol>
        </div>
    )
}

export default TermsBody;