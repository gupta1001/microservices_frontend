import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./Wrapper"

export const ProductsCreate = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    //once the submit is done navigate back to the products
    const navigate = useNavigate();

    const submit = async e => {
        //preventDefault() will not refresh the page once we submit the form
        e.preventDefault();
        await fetch('http://localhost:8000/products',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name,
                price,
                quantity
            })
        });
        //once request completes successfully we will await and navigate back to products
        await navigate(-1);
    }
    return <Wrapper>
        <form className="mt-3" onSubmit={submit}>
            <div className="form-floation pb-3">
                <label>Name</label>
                <input className="form-control" placeholder="Name" 
                onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="form-floation pb-3">
                <label>Price</label>
                <input className="form-control" type="number" placeholder="Price" 
                onChange={e => setPrice(e.target.value)}
                />
            </div>
            <div className="form-floation pb-3">
                <label>Quantity</label>
                <input className="form-control" type={'number'} placeholder="Quantity" 
                onChange={e => setQuantity(e.target.value)}
                />
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">submit</button>
        </form>
    </Wrapper>
}