import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi";

const ViewCart = () => {

    const { user } = useContext(AuthContext)


    //get all food list
    const url = `http://localhost:5000/booked?email=${user?.email}`;

    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                // headers: {
                //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                // }
            });
            const data = await res.json();
            return data;
        }
    })

    if(isLoading){
        return <div>Loading...</div>
    }

  

    //plus one item
    const handleBook = item => {

        const receipt = {
            customerEmail: user?.email,
            customerName: user?.displayName,
            customerPic: user?.photoURL,
            foodName: item.foodName,
            foodPrice: item.foodPrice,
            foodPic: item.foodPic,
            itemsNumber: 1,
            foodId: item._id
        }
        console.log(receipt);

            fetch(`http://localhost:5000/booked?id=${item._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(receipt)
            })
                .then(res => res.json())
                .then(item => {
                    refetch()
                })
                .catch(err => console.errors(err))
    }


    //delete full item
    const handleDelete = id => {
        fetch(`http://localhost:5000/delete-food?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(deleteItem => {
                refetch()
            })
            .catch(err => console.error(err))
    }


    return (
        <div className="container p-2 mx-auto sm:p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full">

                    <thead className="bg-[#474E68]">
                        <tr className="text-center text-white">
                            <th className="p-3">No.</th>
                            <th className="p-3"></th>
                            <th className="p-3">Food Name</th>
                            <th className="p-3">Issued</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Total Amount</th>
                            <th className="p-3">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, i) => <tr key={order._id} className="border-b border-opacity-20 border-black">
                            <td className="p-3 text-center">
                                <p>{i + 1}.</p>
                            </td>
                            <td className="p-3 text-center">
                                <img
                                    src={order.foodPic}
                                    alt=""
                                    className="object-cover w-16 h-16 rounded-full"
                                />
                            </td>
                            <td className="p-3 text-center">
                                <p>{order.foodName}</p>
                            </td>
                            <td className="p-3 text-center">
                                <p>14 Jan 2022</p>
                                <p className="">Friday</p>
                            </td>
                            <td className="p-3 text-center flex justify-center gap-3">
                                <button onClick={() => handleBook(order)}><HiOutlinePlusCircle className='text-3xl hover:text-green-600' /></button>
                                <p>{order?.itemsNumber}</p>
                                <button><HiOutlineMinusCircle className='text-3xl hover:text-red-600' /></button>
                            </td>
                            <td className="p-3 text-center">
                                <p>${order?.itemsNumber * order?.foodPrice}</p>
                            </td>
                            <td className="p-3 flex justify-center">
                                <button onClick={() => handleDelete(order._id)} type="button" className='mt-4'>
                                    <MdOutlineDelete className='text-3xl' />
                                </button>
                            </td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className="border-b py-6 border-opacity-20 border-black">


                <form className="flex items-center ml-20">
                    <h1 className='pr-5'>Coupon:</h1>
                    <div className="space-y-1 text-sm">
                        <input type="text" name="coupon" id="username" placeholder="Coupon Code" className="w-full text-violet-400 text-center py-2 border-b border-black " />
                    </div>

                    <button type="button" className="px-8 py-3 font-semibold text-sm rounded-full bg-violet-400 text-white ml-5">APPLY COUPON</button>
                </form>

            </div>
            <div className="border-b py-10 border-opacity-20 border-black">

                <h1 className='pl-20 text-5xl'>Cart Totals</h1>
            </div>
            <div>
                <div className="border-b flex justify-between py-6 border-opacity-20 px-10 border-black">
                    <h1>Subtotal</h1>
                   
                 <p>${localStorage.getItem('subtotal')}</p> 
                   
                   
                </div>
                <div className="border-b flex justify-between py-6 border-opacity-20 px-10 border-black">
                    <h1>Shipping</h1>
                    <p>$14</p>
                </div>
                <div className="border-b flex justify-between py-6 border-opacity-20 px-10 border-black">
                    <h1>Total</h1>
                    <p>$84</p>
                </div>
                <button type="button" className="px-8 py-3 font-semibold text-sm rounded-full bg-violet-400 mt-5 text-white ml-5">PROCEED TO CHECKOUT</button>
            </div>
        </div>
    );
};

export default ViewCart;