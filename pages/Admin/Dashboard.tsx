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

import remarkGfm from "remark-gfm";
import NotifList from "@/components/NotifList";
import classNames from "classnames";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useState } from "react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
function ColorSwatch() {
  const colors: string[] = [
    "blackA1pha",
    "blue",
    "cyan",
    "facebook",
    "green",
    "linkedin",
    "messenger",
    "orange",
    "pink",
    "purple",
    "teat",
    "telegram",
    "twitter",
    "whatsapp",
    "whiteAtpha",
    "yellow",
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
  // content of the body:
  const [content, setContent] = useState("");
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="full"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent bg="hsl(var(--b2))">
        <ModalHeader className={styles.comHead}>Compose Message</ModalHeader>
        <ModalBody className={styles.comBody}>
          {/* title */}
          <Input colorScheme="" placeholder="Title" />

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
              {/* write here */}
              <TabPanel p="0em" pt="0.3em">
                <Textarea
                  className={styles.textArea}
                  autoFocus
                  placeholder="Body"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </TabPanel>

              {/* markdown preview */}
              <TabPanel p="0em" pt="0.3em">
                {/* markdown here */}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className={styles.markDownArea}
                  components={ChakraUIRenderer()}
                >
                  {content}
                </ReactMarkdown>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter className={styles.comFoot}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>Send Message</Button>
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
