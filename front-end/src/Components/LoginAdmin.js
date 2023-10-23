// import React, { useState } from "react";
// import { Redirect } from "react-router-dom"; // Utilisation de React Router pour la redirection

// function LoginAdmin() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/loginAdmin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: "include",
//       });

//       if (response.ok) {
//         setLoggedIn(true);
//       } else {
//         throw new Error("Something went wrong");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (loggedIn) {
//     // Rediriger l'utilisateur vers la page d'administration après la connexion
//     return <Redirect to="/admin" />;
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="email">Email address</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginAdmin;
