import React from 'react'
import './ComingSoon.css'
export default function ComingSoon() {
    return (
        <header id="header">
            <div class="header-overlay">
                <div class="container">
                    {/* <!-- Logo Starts --> */}
                    <div class="hexagon">
                        <i class="fa fa-flash"></i><span></span>
                    </div>
                    {/* <!-- Logo Ends -->
                    <!-- Main Heading Starts --> */}
                    <div class="main-head">
                        <h2>
                            Something awesome is coming soon
                        </h2>
                        <p>
                            We are building something very cool. Stay tuned and be patient. Your patience will
                            be well paid.
                        </p>
                    </div>
                    {/* <!-- Main Heading Ends --> */}
                </div>
                {/* <!-- Countdown Area Starts --> */}
                <div id="countdown-area">
                    {/* <!-- Count Down Timer Starts --> */}
                    <ul class="countdown">
                        <li><span class="days">00</span>
                            <p class="days_ref">
                                days</p>
                        </li>
                        <li><span class="hours">00</span>
                            <p class="hours_ref">
                                hours</p>
                        </li>
                        <li><span lass="minutes">00</span>
                            <p class="minutes_ref">
                                minutes</p>
                        </li>
                        <li><span class="seconds">00</span>
                            <p class="seconds_ref">
                                seconds</p>
                        </li>
                    </ul>
                    {/* <!-- Count Down Timer Ends --> */}
                </div>
                {/* <!-- Countdown Area Ends --> */}
            
            </div>
        </header>
    )
}
