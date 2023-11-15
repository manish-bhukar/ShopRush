import { Link } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/Components/productList";
function Home() {
  return (
    <Navbar>
     <ProductList></ProductList>
    
    </Navbar>
  );
}

export default Home;
