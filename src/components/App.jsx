import Header from "./Header";
import Portfolio from "./Portfolio";
import Wallet from "./Wallet";

function App(props) {
    return (
        <div className="container">
            <Header />
            <Wallet />
            <Portfolio />
        </div>
    )
}

export default App;