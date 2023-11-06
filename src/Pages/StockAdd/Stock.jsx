import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'
import Loader from '../../Components/Loader/Loader'
import AddStock from './AddStock'

export default function Stock() {
    return (
        <>
        <Loader />
        <div className="container-fluid p-3">
            
            <Nav />
            <div className="container">
                    <AddStock />
            </div>
            
            <Footer />

        </div>
        </>
    )
}
