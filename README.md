# Crypto Trading Simulator
 
We will be making a fully functional trading simulator. You should be able to:
- See prices of top currencies
- Buy crypto assets
- Sell crypto assets
- See your holdings
- See your order history

[API Used](https://www.coingecko.com/en/api#explore-api)

## Discussion points (Needs to be filled by your team):
- What are the components you will be creating?
```
1. Header > Title, Wallet, Portfolio
2. Cryptocoins Cards
3. Holdings Cards
4. Transactions Card
```

- How the information will be flowing in the app?
```
The info will flow using the UseReducer Hook. We will store the default states for holdings, transactions as arrays, and wallet and portolio values as numbers.
```
- Flow:
```
Step1. Create the Header Components.
Step2. Generate the Cards Dianamically using fetch API
Step3. Apply Initial CSS
Step4. Create the "POP-UP Dialog Box" to show up on buy/sell clicks
Step5. Add functionalty to buy/sell buy using values from wallet, curr Crypto Price and setting up the logic for the transaction.
Step6. Dynamically Update Values in Portfolio and Wallet using useReducer Hook and Gernate Transaction Cards by updating the transaction Array in Reducer State.
```



### Style Guide
- Poppins
- Color shades you can choose
- Background svg is available inside public folder

### Screenshots
![](./screenshots/starting_point.png)
![](./screenshots/buy-state.png)
![](./screenshots/buy-amount.png)
![](./screenshots/after-buy-transactions.png)
![](./screenshots/sell-state.png)

![](./screenshots/after-sell.png)

### App Demo
[Link to video](./screenshots/crypto-demo.mp4)
