import React from 'react'
import './ContactUs.css'
export default function ContactUs() {
    return (
        <div class="container">
            {/* <!-- Main Heading Starts --> */}
            <div class="main-head">
                <h2 class="MT40">
                    Subscribe & Stay Updated</h2>
            </div>
            {/* <!-- Main Heading Ends --> */}
            {/* <!-- Form & Address Blocks Starts --> */}
            <div class="row">
                {/* <!-- Contact Form Starts --> */}
                <div id="contact-area" class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <form id="contact-form" class="contact-form" name="contact-form">
                        <div class="form-group">
                            <input type="text" name="name" class="form-control" required placeholder="Enter Your Name" />
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" class="form-control" required placeholder="Enter Your Email"/>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-info">Subscribe</button>
                        </div>
                    </form>
                </div>
                {/* <!-- Contact Form Ends --> */}
                {/* <!-- Contact Address Starts --> */}
                <div  class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority
                        have suffered alteration in some form, by injected humour, or randomised words which
                        don't look even slightly believable. If you are going to use a passage of Lorem
                        Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle
                        of text.</p>
                </div>
                {/* <!-- Contact Address Ends --> */}
            </div>
            {/* <!-- Form & Address Blocks Ends --> */}
        </div>
    )
}
