import React from 'react';
// import { useState, useEffect } from 'react'
// import Nav from '../../Components/Nav/Nav'
// import Headline from '../../Components/Headline/Headline'
// import Request from '../../Components/Request/Request'
// import Footer from '../../Components/Footer/Footer'
// import Loader from '../../Components/Loader/Loader'
// import USP from '../../Components/USP/USP'
import Homepage from '../../v1/Pages/Homepage'
export default function Home() {
    //     const [toggle, setToggle] = useState(false);
    //     window.localStorage.setItem('toggle', toggle)
    //     useEffect(() => {
    //         const currentToggle = window.localStorage.getItem('toggle') === 'true';
    //         setToggle(currentToggle);
    //     }, [])

    //     // const handleToggle = (value) => {
    //     setToggle(value);
    //     window.localStorage.setItem('toggle', value)
    // }

    // localStorage.setItem("items", JSON.stringify([]))
    return (
        <>
            {/* <Loader />
            <div className="container-fluid p-3">

                <Nav />
                <Headline toggle={toggle} setToggle={handleToggle} />
                <Request toggle={toggle} />
                <USP />
                <Footer />

            </div> */}
            <Homepage />
        </>
    )
}
