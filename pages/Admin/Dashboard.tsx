import { useSession } from "next-auth/react";
import Layout from "../Layout";

import { useDisclosure } from "@chakra-ui/react";
import styles from "./Dashboard.module.css";
import NotifList from "@/components/NotifList";
import Joke from "@/components/Joke";
import FloatingButton from "@/components/FloatingButton";
import FilePreview from "@/components/FilePreview";

import { EditIcon } from "@chakra-ui/icons";
import SendMessageModal from "@/components/SendMessageModal/SendMessageModal";

// function to send the message:

// Admin Dashboard page
export default function Admin() {
  const session = useSession();
  let name = session.data?.user?.name;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Layout>
        <div>
          <Joke />
        </div>

        <div className={styles.notifications}>
          <NotifList adminMode={true} />
        </div>

        {/* floating button here */}
        <FloatingButton
          onOpen={onOpen}
          SideIcon={EditIcon}
          HalfText={"Compose"}
          RemainingText={"New Message"}
          initialWidth={7.8}
          finalWidth={14.3}
          rotateBy={0}
        />

        <SendMessageModal isOpen={isOpen} onClose={onClose} />
      </Layout>
    </>
  );
}
