import React from 'react'
import './USP.css'
import Binge from './Binge.svg'
// import Lovers from './Lovers.svg'
import Funguys from './Funguys.svg'
import Party from './Party.svg'


export default function USP() {
    return (
        <div className="container">
            <h4 className="text-center headline-mid">How can Phurti help you?</h4>
            <div className="row mt-5 text-center">
                <div className="col-md-4 col-12 col-sm-4 cards-details">
                    <img src={Binge} alt="Binge Watching" />
                    <p className="USP-text">
                        Binge watching your favorite show? Order chilled coke and much more on Phurti.
                    </p>
                </div>

                {/* <div className="col-md-3 col-12 col-sm-4 cards-details">
                    <img src={Lovers} alt="Binge Watching" />
                    <p className="USP-text">
                        Planning a Date night with your partner? We will deliver everything to plan a perfect date. 
                    </p>
                </div> */}

                <div className="col-md-4 col-12 col-sm-4 cards-details">
                    <img src={Funguys} alt="Funguys" />
                    <p className="USP-text">
                        Out of smokes in the middle of a party. Oh wait, everyone prefers a different brand. You know what - we are there.
                    </p>
                </div>
                <div className="col-md-4 col-12 col-sm-4 cards-details">
                    <img src={Party} alt="Party" />
                    <p className="USP-text">
                        Want to cook today? Missing out on key ingredients? Can't wait. Let us get it to you in a few minutes.
                    </p>
                </div>
            </div>

        </div>
    )
}
