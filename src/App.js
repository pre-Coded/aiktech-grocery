import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Switch,Router } from 'react-router-dom';
// import Checkout from './Pages/Checkout/Checkout';
// import Comingsoon from './Pages/Comingsoon/Comingsoon'
import Feedback from './Pages/Feedback/Feedback';
import Feedbackthank from './Pages/Feedback/Feedbackthank';
import Allorder from './Pages/Allorder/Allorder'
import TermsCondition from './Pages/TermsCondition/TermsCondition'
import Stock from './Pages/StockAdd/Stock';
import AllRecentOrder from './Pages/AllRecentOrder/AllRecentOrder';
import { 
  Home, 
  Category, 
  Checkout, 
  OrderSuccess, 
  Timer, 
  EverythingDelivery, 
  ActiveOrders, 
  Favourite, 
  AddStock, 
  Invoice, 
  PunchEorder, 
  WastedProduct ,
  Terms,
  Shippingpolicy,
  Privacypolicy,
  Aboutus,
  Contactus
} from './v1/Pages';
import { Navigation, Footer, Bottom, ProductCard } from './v1/Components';
import configureStore from './v1/Redux/store/configureStore';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './v1/Components/ScrollToTop/ScrollToTop';
import { AuthWrapper } from './v1/Wrapper/'
import Dashboard from './v1/Pages/dashboard/Dashboard';
import Carditems from './v1/Components/cardItems/CardItems';
import SideBar from './v1/Components/SideBar/SideBar';
import TenantDashboard from './v1/Pages/TenantDashboard/TenantDashboard';



export const { store } = configureStore();

function App() {
  
  return (
    <div className="AppRoot">
      <Provider store={store}>
          <Switch>
          <Route path='/dashboard' render={()=>(<AuthWrapper><TenantDashboard/></AuthWrapper>)}/> 
            <Route path="/">
              <Navigation />
              <ScrollToTop />
              <Switch>
                <Route exact path="/" component={Home} />
                {/* <Route exact path="/comingsoon" component={Comingsoon} /> */}
                <Route path="/categories/:category" component={() => (<AuthWrapper><Category /></AuthWrapper>)} />
                <Route path="/categories" component={() => (<AuthWrapper><Category /></AuthWrapper>)} />
                <Route path="/everythingdelivery" component={() => (<AuthWrapper><EverythingDelivery /></AuthWrapper>)} />
                <Route path="/addstock/:id/" component={AddStock} />
                <Route exact path="/order-placed" component={OrderSuccess} />
                <Route path="/feedback/:orderid" component={Feedback} />
                <Route path="/feedback-sent" component={Feedbackthank} />
                <Route path="/invoice/:orderid" component={Invoice} />
                <Route path="/add/everythingorder/:id" component={PunchEorder} />
                <Route path="/recent/order" component={Allorder} />
                <Route path="/all/order" component={AllRecentOrder} />
                <Route path="/myorders" component={() => (<AuthWrapper><ActiveOrders /></AuthWrapper>)} />
                {/* <Route path="/terms" component={TermsCondition} /> */}
                {/* <Route path="/addstock" component={Stock} /> */}
                <Route path="/checkout" component={() => (<AuthWrapper><Checkout /></AuthWrapper>)} />
                <Route path="/wastedproduct" component={WastedProduct} />
                <Route path="/wishlist" component={() => (<AuthWrapper><Favourite /></AuthWrapper>)} />
                {/* <Route path="/terms" component={Terms} /> */}
                {/* <Route path="/shipping-policy" component={Shippingpolicy} /> */}
                <Route path="/privacy-policy" component={Privacypolicy} />
                 {/* added */}
                        
               <Route path='/orderItems' render={()=><Carditems/>}/>
                {/* <Route path="/aboutus" component={Aboutus} />
                <Route path="/contactus" component={Contactus} /> */}
                <Route path="*" component={Home} />

              </Switch>
              <Bottom />
              <Footer />
            </Route>
            
          </Switch>
        
      </Provider>
      <ToastContainer
        className="toast-container"
        autoClose={2000}
        closeOnClick
        hideProgressBar={true}
        newestOnTop={true}
        pauseOnHover
        position="top-right"
        type="default"
        theme="colored"
        limit={1}
      />
    </div>
  );
}

export default App;
