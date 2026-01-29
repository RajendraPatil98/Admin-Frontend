import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { API_BASE_URL } from "../../util/constants";

//import { fetchUserOrders } from "../../service/orderService";

const Orders = () => {
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    //const response = await fetchUserOrders(token);
    //setData(response);

    const response = await axios.get(`${API_BASE_URL}/orders/all`);
    setData(response.data);
  };

  const updateStatus = async (event,orderId) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/orders/status/${orderId}?status=${event.target.value}`);
      if(response.status === 200){
        await fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {data.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={assets.parcel}
                        alt=""
                        height={48}
                        width={48}
                      />
                    </td>
                    <td>
                      <div>
                      {order.orderedItems.map((item, index) => {
                        if (index === order.orderedItems.length - 1) {
                          return item.name + " x " + item.quantity;
                        } else {
                          return item.name + " x " + item.quantity + ", ";
                        }
                      })}
                      </div>
                      <div>
                         {order.userAddress}
                      </div>
                    </td>
                    <td>&#x20B9;{order.amount.toFixed(2)}</td>
                    <td>Items: {order.orderedItems.length}</td>
                    <td>
                       <select className="form-control" value={order.orderStatus} onChange={(event) => updateStatus(event,order.id)}>
                         <option value="Food Preparing">Food Preparing</option>
                         <option value="Out for Delivery">Out for Delivery</option>
                         <option value="Delivered">Delivered</option>
                       </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
