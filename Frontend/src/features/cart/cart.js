import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { deleteItemsAsync, selectItems } from './cartSlice'
import { updateItemsAsync } from './cartSlice';
import { Navigate } from 'react-router-dom'
export default function Cart(){
  const dispatch=useDispatch();
  const [open, setOpen] = useState(true);
  const items=useSelector(selectItems);
  const totalAmt=items.reduce((total,item)=>total+item.product.price*item.quantity,0);
  const totalItems=items.reduce((total,item)=>total+item.quantity,0);

  const handleQuantity=(e,item)=>{
    dispatch(updateItemsAsync({id:item.id,quantity:+e.target.value}))
  }
  const handleRemove=(e,id)=>{
    dispatch(deleteItemsAsync(id)) 
  }
  return (
    <>
    {!items.length && <Navigate to='/' replace={true}></Navigate>}
      <div>
        <div className="mx-auto mt-7 bg-white max-w-4xl px-2 sm:px-2 lg:px-2">
          <h1 className="text-4xl my-3 font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.id}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">${item.product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-3 text-sm font-medium leading-4"
                          >
                            {" "}
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={(e) => handleRemove(e, item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium my-2 text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmt}</p>
            </div>
            <div className="flex justify-between text-base font-medium my-2 text-gray-900">
              <p>Total Items</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}