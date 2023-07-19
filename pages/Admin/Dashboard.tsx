import { useSession } from "next-auth/react";
import Layout from "../Layout";

import {
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FiFeather } from "react-icons/fi";
import styles from "./Dashboard.module.css";

import NotifItem from "@/components/NotifItem";
import NotifList from "@/components/NotifList";
import classNames from "classnames";

function ColorSwatch() {
  const colors: string[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "#FFC0CB", // Lighter shade of red (Pink)
    "#FFA500", // Lighter shade of orange (Orange)
    "#FFFF00", // Lighter shade of yellow (Yellow)
    "#90EE90", // Lighter shade of green (LightGreen)
    "#ADD8E6", // Lighter shade of blue (LightBlue)
    "#8A2BE2", // Lighter shade of indigo (BlueViolet)
    "#EE82EE", // Lighter shade of violet (Violet)
  ];
  return (
    <div className={styles.colorPalette}>
      {colors.map((color, index) => (
        <Button
          key={index}
          className={classNames("clicky", styles.swatch)}
          style={{ backgroundColor: color }}
          onClick={() => {
            console.log(color);
          }}
        ></Button>
      ))}
    </div>
  );
}

function ComposeMsgModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      // responsive:
      size={{ sm: "2xl", base: "xs", lg: "2xl" }}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent bg="hsl(var(--b2))">
        <ModalHeader className={styles.comHead}>Compose Message</ModalHeader>
        <ModalBody className={styles.comBody}>
          {/* title */}
          <Input placeholder="Title" />

          {/* Target */}
          <div className={styles.targetLabel}>
            <div>
              <Select placeholder="All" className={styles.target}>
                <option value="option1">Students</option>
                <option value="option2">Faculties</option>
              </Select>
            </div>

            <div className={styles.colorLabel}>
              <Input
                borderColor="lime"
                color="lime"
                focusBorderColor="lime"
                placeholder="Label"
                _placeholder={{ color: "inherit" }}
              />

              <Popover>
                <PopoverTrigger>
                  <Button className="clicky"></Button>
                </PopoverTrigger>
                <PopoverContent className={styles.popContent}>
                  <PopoverBody p="0em">
                    Choose color
                    <ColorSwatch />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Tabs isFitted variant="enclosed" className={styles.tabs}>
            <TabList>
              <Tab>Write</Tab>
              <Tab>Preview</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0em" pt="0.3em">
                <Textarea placeholder="Body" />
              </TabPanel>
              <TabPanel p="0em" pt="0.3em">
                <Textarea placeholder="Body" />
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* body */}
        </ModalBody>
        <ModalFooter className={styles.comFoot}>
          <Button className="clicky" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="clicky">Send Message</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
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
        <ComposeMsgModal isOpen={isOpen} onClose={onClose} />
        {/* Compose mesaage modal */}
      </Layout>
    </>
  );
}
