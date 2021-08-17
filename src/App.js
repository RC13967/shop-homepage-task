import { createContext, useContext, useState } from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import './App.css';
const Counter = createContext(null);  //created context for total items in cart
function App() {
  //passing each card details as an array
  const products = [
    {
      productname: "Fancy Product",
      productprice: "$40.00 - $80.00",
      items: 0
    },
    {
      productname: "Special Item",
      productprice: " $18.00",
      items: 0
    },
    {
      productname: "Sale Item",
      productprice: " $25.00",
      items: 0
    },
    {
      productname: "Popular Item",
      productprice: "$40.00",
      items: 0
    },
    {
      productname: "Sale Item",
      productprice: " $25.00",
      items: 0
    },
    {
      productname: "Fancy Product",
      productprice: "$120.00 - $280.00",
      items: 0
    },
    {
      productname: "Special Item",
      productprice: " $18.00",
      items: 0
    },
    {
      productname: "Popular Item",
      productprice: "$40.00",
      items: 0
    },
  ];
  const [count, setCount] = useState(0); //initial items in cart are zero
  return (
    <>
      {/* button for the cart */}
      <div className="header">
        <button className="header-button" ><ShoppingCartIcon />
          <div className=" header-button-text">Cart</div>
          <div className="total-items">{count}</div>    {/* this is the number of total items in cart */}
        </button>
      </div>

      <div className="container">
        {products.map(({ productname, productprice, items }) => (
          <Counter.Provider value={{ count, setCount }}>    {/* this context providerprovides the count and setcount */}
            {/*choosing each card and passing the values as props */}
            <Product
              product={productname}
              price={productprice}
              items={items}
            />
          </Counter.Provider>
        ))}
      </div>
    </>
  );
}
//displays the data of each product
function Product({ product, price, items }) {
  return (
    <div className="card">
      <div className="sizediv">450 x 300</div>
      <div className="content">
        <span className="sale">Sale</span>
        <h2>{product}</h2>
        <div className="rating"></div>
        <p className="price">{price}</p>
      </div>
      <Cartbutton items={items} />  {/* this creates add/remove button for each product */}
    </div>
  );
}
function Cartbutton({ items }) {
  const [additem, setAdd] = useState(0); //initial items are zero for all products
  const { count, setCount } = useContext(Counter);  //gets the data(items in cart) from the context provider
  return (
    <div className="cartitems" >
      {/*if there are  items chosen for a product, then increase and decrease buttons will be displayed*/}
      <div className="changeitems"
        style={{ display: additem === 0 ? "none" : "block" }}>
        {/* setAdd removes the item from the card, when button is clicked whereas 
        setCount removes the item from the total items cart button*/}
        <button onClick={() => { setAdd(additem - 1); setCount(count - 1) }}>
          <RemoveShoppingCartIcon /></button>
        <span className="additem">{items = additem} </span>
        {/* setAdd adds the item to the card, when button is clicked whereas 
        setCount adds the item to the total items cart button*/}
        <button onClick={() => { setAdd(additem + 1); setCount(count + 1) }}>
          <AddShoppingCartIcon /></button><br />
          {/* removes all items of a particular type */}
          <button onClick = {()=>{ setAdd(0); setCount(count - additem)}}><DeleteIcon /></button>
      </div>

      {/*if there are no items chosen for a product, then Add to cart button is displayed*/}
      <div className="zeroitems"
        style={{ display: additem !== 0 ? "none" : "block" }}>
        <button className="add-to-cart" onClick={() => { setAdd(additem + 1); setCount(count + 1) }}>Add to cart</button>
      </div>

    </div>
  );
}
export default App;
