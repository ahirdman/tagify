// import * as React from "react";
// import { createContext } from 'react';

// // create context
// const UserContext = createContext();

// const UserContextProvider = ({ children }) => {
//   // the value that will be given to the context
//   const [user, setUser] = useState(null);

//   // fetch a user from a fake backend API
//   useEffect(() => {
//     const fetchUser = () => {
//       // this would usually be your own backend, or localStorage
//       // for example
//       fetch("https://randomuser.me/api/")
//         .then((response) => response.json())
//         .then((result) => setUser(result.results[0]))
//         .catch((error) => console.log("An error occured"));
//     };

//     fetchUser();
//   }, []);

//   return (
//     // the Provider gives access to the context to its children
//     <UserContext.Provider value={user}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserContextProvider };
