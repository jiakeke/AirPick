import PassengerOrders from "./PassengerOrder";
import DriverOrders from "./DriverOrder";
import { useAuth } from '../hooks/useAuth';


export default function OrdersList() {
  const { auth } =  useAuth();
  console.log("orderlist.auth",auth);

  return (
          <>
              { auth.isLoggedIn ? (
                auth.category === 'passenger' ? (
                  <PassengerOrders />
                ) : auth.category === 'driver' ? (
                  <DriverOrders />
                ) : (
                  <div>Invalid user type</div>
                )
              ) : null
              }
          </>
  );
}
