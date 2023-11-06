import React from 'react'
import logo from '../../logo.svg'
import mapmarker from './map-marker.svg'
import down from './down.svg'
import './Nav.css'
import { Link } from 'react-router-dom'
// import { itemCount } from '../../api/request.api'
// import axios from 'axios'

export default function Nav() {
    // const [count, setCount] = useState(0)
    
    // useEffect(() => {
    //     let phone = localStorage.getItem("phone")
    //     let nam = localStorage.getItem("name")
    //     axios({
    //         url: `${itemCount}${phone}/${nam}/`,
    //         method: 'GET',
    //       })
    //       .then((res) => {
    //         if (res.data.status === 400) {
                
    //         } else {
    //             setCount(res.data.final_items)
                
                
    //         }
    //       })
    //       .catch((err) => {
            
            
    //       });
    // }, [])
    return (
        <div className="container">
            <div className="row">

                <div className="col-lg-6 col-md-6 col-3 col-sm-6">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                    <h4>Phurti</h4>
                </div>
                <div className="col-lg-3 col-md-1 col-12 col-sm-6 d-none d-md-block"></div>
                <div className="col-lg-3 col-md-5 col-9 col-sm-6 m-auto text-center">
                    <img src={mapmarker} alt="Location" className='px-2'/>
                    <span className="city_name">Whitefield</span>
                    <img src={down} alt="Down" className='px-2'/>
                    <Link to="/checkout" className="no-link">
                        <i className="fa fa-shopping-cart"></i>
                        {/* <span className="shop-count">{count}</span> */}
                    </Link>
                    
                </div>
                
            </div>
        </div>
    )
}
