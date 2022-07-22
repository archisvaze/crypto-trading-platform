import Header from "./Header";
import Portfolio from "./Portfolio";
import Wallet from "./Wallet";

function App(props) {
    const [bitcoinAmt, setbitcoinAmt] = useState(0);
    // const [bitcoinAmt, setbitcoinAmt] = useState(0);
    // const [bitcoinAmt, setbitcoinAmt] = useState(0);
    return (
        <div className="container">
            <Header />
            <Wallet />
            <Portfolio />
        </div>
    )
}

export default App;