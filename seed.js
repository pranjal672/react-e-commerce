// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://gsavirfngfbxprkoqkry.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYXZpcmZuZ2ZieHBya29xa3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyOTIwNTAsImV4cCI6MTk5ODg2ODA1MH0.bBf8qlMtj5TE47fAJGZEcj9XojESpOgvvXT0ELEPbbw";

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// async function fetchProducts() {
//   const response = await fetch("https://fakestoreapi.com/products");
//   const productData = await response.json();
//   let products = [];
//   for (const product of productData) {
//     delete product.id;
//     const { rate, count } = product.rating;
//     delete product.rating;
//     product.reviewRating = rate;
//     product.reviewCount = count;
//     products.push(product);
//   }
//   try {
//     const { data, error } = await supabase.from("products").insert(products);
//     if (error) throw new Error(error.message);
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// fetchProducts();
