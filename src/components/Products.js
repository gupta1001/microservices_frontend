import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Wrapper } from "./Wrapper"

export const Products = () => {
    const [products, setProducts] = useState([]);

    //to get the products we are making the request at the backend
    useEffect(() => {
        //creating async function here as useEffect does not suppot adding async function on top
        (async () => {
            const response = await fetch('http://localhost:8000/products')
            const content = await response.json();
            
            //the content received in json will be our product
            // hence we set the product 
            setProducts(content);
        })();
    },[])

    const del = async id => {
        if(window.confirm('Are you sure you want to delete this product record')){
            await fetch('http://localhost:8000/products/'+id,{
            method: 'DELETE'
            });
            //if above call is successfull we have to remove the products from the table
            setProducts(products.filter(p => p.id !== id));
        }
    }

    return <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to={'/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
        </div>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map (product =>{
                        return<tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                onClick={e => del(product.id)}
                            >
                                Delete
                            </a>
                        </td>
                    </tr>
                    })}
                    
                </tbody>
            </table>
        </div>
    </Wrapper>
}