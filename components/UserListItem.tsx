// import React from "react";
// import { Badge, Button, useToast } from "@chakra-ui/react";
// import styles from "./UserListItem.module.css";

// function UserListItem({
//   userData,
//   mutate,
// }: {
//   userData: ReceivedUserDataOnClient;
//   mutate: () => void;
// }) {
//   const toast = useToast();

//   const handleDelete = async () => {
//     const res = await fetch(`/api/user?userId=${userData._id}`, {
//       method: "DELETE",
//     });
//     if (res.ok) {
//       toast({
//         title: "User deleted",
//         description: `User ${userData.name} deleted`,
//         status: "success",
//         duration: 9000,
//         isClosable: true,
//       });
//     } else {
//       toast({
//         title: "Error",
//         description: `User ${userData.name} could not be deleted`,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//     mutate();
//   };

//   return (
//     <li className={styles.userListItem}>
//       <div className={styles.userInfo}>
//         <span>
//           {userData.name}{" "}
//           <Badge colorScheme={userData.role === "Student" ? "blue" : "red"}>
//             {userData.role}
//           </Badge>
//         </span>
//         <Button
//           colorScheme="red"
//           size="sm"
//           variant="outline"
//           onClick={handleDelete}
//         >
//           Delete
//         </Button>
//       </div>
//     </li>
//   );
// }

// export default UserListItem;
