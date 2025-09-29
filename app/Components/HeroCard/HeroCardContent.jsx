// "use client"; // for Next.js app directory

// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../../lib/firebase"; // adjust import if path is different

// export default function HeroCardContent() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const snapshot = await getDocs(collection(db, "posts"));
//       const postData = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setPosts(postData);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Posts</h1>
//       {posts.map((post) => (
//         <div key={post.id} className="mb-4 border p-3 rounded-md shadow">
//           <h2 className="text-lg font-semibold">{post.Title}</h2>
//           <p>{post.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
