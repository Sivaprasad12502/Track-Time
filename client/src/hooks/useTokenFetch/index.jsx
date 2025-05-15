// import { getAuth } from "firebase/auth";
// import React, { useEffect, useState } from "react";

// export default function useTokenFetch(initialValues = null) {
//   const [token, setToken] = useState(initialValues);
//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const auth = getAuth();
//         const user = auth.currentUser;
//         if (!user) {
//           throw new Error("user is not logged in");
//         }
//         const token = await user.getIdToken();
//         setToken(token);
//       } catch (e) {
//         console.log(e.message);
//       }
//     };
//     fetchToken()
//   },[]);
//   return token;
// }
