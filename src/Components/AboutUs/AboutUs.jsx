import React from 'react'
import './AboutUs.css'
export default function AboutUs() {
    return (
        <section id="services">
            <div class="services-overlay">
                <div class="container">
                    {/* <!-- Main Heading Starts --> */}
                    <div class="main-head">
                        <h2 >About Us</h2>
                        <h5>
                            We create pixel perfect responsive WordPress themes, HTML5 templates and jQuery
                            plugins.</h5>
                        <br />
                        <p>
                            EGrappler is a small group of dedicated Knights working hard around the table and
                            the clock to make awesome free and premium templates, UI kits and WordPress themes.
                        </p>
                    </div>
                    {/* <!-- Main Heading Ends --> */}
                    {/* <!-- Services List Starts --> */}
                    <div id="services-blocks" class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 sblock">
                            <span class="fa fa-star-o"></span>
                            <h4>
                                Creative</h4>
                            <p>
                                It is a long established fact that a reader will be distracted by the readable content
                                of a page when looking at its layout.
                            </p>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 sblock">
                            <span class="fa fa-smile-o"></span>
                            <h4>
                                Affordable</h4>
                            <p>
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                in a piece of classical Latin literature from 45 BC.
                            </p>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 sblock">
                            <span class="fa fa-eye"></span>
                            <h4>
                                Retina Ready</h4>
                            <p>
                                There are many variations of passages of Lorem Ipsum available, but the majority
                                have suffered alteration in some form.
                            </p>
                        </div>
                    </div>
                    {/* <!-- Services List Ends --> */}
                </div>
            </div>
        </section>
    )
}
