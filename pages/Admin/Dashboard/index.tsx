import { useSession } from "next-auth/react";
import Layout from "../../Layout";

import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FiFeather } from "react-icons/fi";
import styles from "./Dashboard.module.css";

import NotifItem from "@/components/NotifItem";
import NotifList from "@/components/NotifList";

export default function Admin() {
  const session = useSession();
  let name = session.data?.user?.name;

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Layout>
        {/* greetings part */}
        <div className={styles.greeting}>
          <span>
            Welcome <span className={styles.name}>{name}</span>!{" "}
          </span>
          Let <span className={styles.glowingText}>Lumos</span> illuminate your
          path at our
          <span className={styles.appName}> Enchanted Oasis!</span>
        </div>
        <div className={styles.notifications}>
          <NotifList />
        </div>
        <IconButton
          aria-label="compose"
          className={styles.composeMsg}
          icon={<FiFeather />}
          onClick={onOpen}
        />
        {/* Compose mesaage modal */}

        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
        >
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent bg="hsl(var(--b2))">
            <ModalHeader className={styles.comHead}>
              Compose Message
            </ModalHeader>
            <ModalBody className={styles.comBody}>
              {/* title */}
              <Input placeholder="Title  " />

              {/* body */}
              <Textarea placeholder="Here is a sample placeholder" />
            </ModalBody>
            <ModalFooter className={styles.comFoot}>
              <Button className="clicky" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button className="clicky">Send Message</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    </>
  );
}
