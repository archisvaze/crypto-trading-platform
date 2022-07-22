import Header from "./Header";
import Portfolio from "./Portfolio";
import Wallet from "./Wallet";
import BitcoinCard from "./BitcoinCard";
import EthereumCard from "./EthereumCard";
import DogecoinCard from "./DogecoinCard";

function App(props) {
    const [bitcoinAmt, setbitcoinAmt] = useState(0);
    // const [bitcoinAmt, setbitcoinAmt] = useState(0);
    // const [bitcoinAmt, setbitcoinAmt] = useState(0);
    return (
        <div className="container">
            <Header />
            <Wallet />
            <Portfolio />
            <div className="crypto-cards-container">
                < BitcoinCard />
                < EthereumCard />
                <DogecoinCard />
            </div>
        </div>
    )
}

export default App;