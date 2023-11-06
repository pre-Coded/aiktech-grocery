import React from 'react'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'
import Loader from '../../Components/Loader/Loader'
import PunchForm from './PunchForm'

export default function PunchEorder() {
    return (
        <>
        <Loader />
        <div className="container-fluid p-3">
            
            <Nav />
            <div className="container">
                    <PunchForm />
            </div>
            
            <Footer />

        </div>
        </>
    )
}
