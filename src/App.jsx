import { useContext, useEffect } from "react";
import { FilterProvider } from "./context/FilterContext";
import { supabase } from "./supabaseClient";
import CartContext from "./context/CartContext";
import Home from "./pages/Home";

function App() {
  const { setCart, setWishList } = useContext(CartContext)

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (_event == "SIGNED_IN") {
        const getCartData = async () => {
          const { data, error } = await supabase.from("cart").select("*").eq("user_id", session?.user.id)
          if (error) console.error(error)
          setCart(data)
        }
        const getWishData = async () => {
          const { data, error } = await supabase.from("wishlist").select("*").eq("user_id", session?.user.id)
          if (error) console.error(error)
          setWishList(data)
        }
        getWishData()
        getCartData()
      }

      if (_event === "SIGNED_OUT") {
        setCart([])
        setWishList([])
      }
    })
  }, [])

  return (
    <>
      <FilterProvider>
        <Home />
      </FilterProvider>
    </>
  )
}

export default App
