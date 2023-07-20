import { useSession } from "next-auth/react";
import Layout from "../Layout";

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
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import styles from "./Dashboard.module.css";

import remarkGfm from "remark-gfm";
import NotifList from "@/components/NotifList";
import classNames from "classnames";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ReducerAction, useReducer, useState } from "react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

import { EditIcon } from "@chakra-ui/icons";
// Color Swatch Component
function ColorSwatch({
  data,
  dispatchData,
}: {
  data: NotifData;
  dispatchData: React.Dispatch<ReducerAction<typeof mutateData>>;
}) {
  const colors: string[] = [
    "cyan",
    "green",
    "orange",
    "red",
    "purple",

    "yellow",
  ];
  return (
    <div className={styles.colorPalette}>
      {colors.map((color, index) => (
        <Button
          key={index}
          className={classNames("clicky", styles.swatch)}
          colorScheme={color}
          onClick={() => {
            dispatchData({ type: "badgeColor", payload: color });
          }}
        ></Button>
      ))}
    </div>
  );
}
type NotifData = {
  title: string;
  audience: string;
  badgeText: string;
  badgeColor: string;
  body: string;
};

// Mutate Data function
function mutateData(
  state: NotifData,
  action: {
    type: string;
    payload: string;
  }
) {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "audience":
      return { ...state, audience: action.payload };
    case "badgeText":
      return { ...state, badgeText: action.payload };
    case "badgeColor":
      return { ...state, badgeColor: action.payload };
    case "body":
      return { ...state, body: action.payload };
    default:
      return state;
  }
}

// function to send the message:
async function sendMessage(data: NotifData, onClose: any, toast: any) {
  const res = await fetch("/api/notification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to all the users",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  } else {
    toast({
      title: "Message Not Sent",
      description: await res.text(),
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

// Compose Message Modal Component
function ComposeMsgModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // content of the body:
  const toast = useToast();
  const [data, dispatchData] = useReducer(mutateData, {
    title: "",
    audience: "All",
    badgeText: "",
    badgeColor: "red",
    body: "",
  });

  function validation() {
    for (let field of Object.keys(data)) {
      if ((data as any)[field].trim() === "") {
        toast({
          title: `${field} is empty`,
          description: `Please enter a ${field}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
    }

    return true;
  }

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={{
        base: "full",
        md: "xl",
      }}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent bg="hsl(var(--b2))">
        <ModalHeader className={styles.comHead}>
          Compose Message
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody className={styles.comBody}>
          {/* title */}
          <Input
            placeholder="Title"
            value={data.title}
            onChange={(e) => {
              dispatchData({ type: "title", payload: e.target.value });
            }}
          />

          {/* Target */}
          <div className={styles.targetLabel}>
            <div>
              <Select
                placeholder="All"
                className={styles.target}
                onChange={(e) => {
                  dispatchData({ type: "audience", payload: e.target.value });
                }}
                value={data.audience}
              >
                <option value="Student">Students</option>
                <option value="Faculty">Faculties</option>
              </Select>
            </div>

            <div className={styles.colorLabel}>
              <Input
                variant={"outline"}
                placeholder="Label"
                borderColor={`${data.badgeColor}.100`}
                value={data.badgeText}
                onChange={(e) => {
                  dispatchData({ type: "badgeText", payload: e.target.value });
                }}
              />

              <Popover>
                <PopoverTrigger>
                  <Button
                    colorScheme={data.badgeColor}
                    className="clicky"
                  ></Button>
                </PopoverTrigger>
                <PopoverContent className={styles.popContent}>
                  <PopoverBody p="0em">
                    label color
                    <ColorSwatch data={data} dispatchData={dispatchData} />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Tabs isFitted variant="enclosed" className={styles.tabs}>
            <TabList mb="0.1em">
              <Tab>Write</Tab>
              <Tab>Preview</Tab>
            </TabList>
            <TabPanels>
              {/* write here */}
              <TabPanel className={styles.grp}>
                <textarea
                  className={styles.textArea}
                  placeholder="Body"
                  value={data.body}
                  onChange={(e) => {
                    dispatchData({ type: "body", payload: e.target.value });
                  }}
                />
                <div className={styles.bodyFoot}>
                  <span>Markdown is supported</span>
                </div>
              </TabPanel>

              {/* markdown preview */}
              <TabPanel p="0em" pt="0.3em">
                {/* markdown here */}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className={styles.markDownArea}
                  components={ChakraUIRenderer()}
                >
                  {data.body}
                </ReactMarkdown>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter className={styles.comFoot}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!validation()) return;
              sendMessage(data, onClose, toast);
            }}
          >
            Send Message
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Admin Dashboard page
export default function Admin() {
  const session = useSession();
  let name = session.data?.user?.name;

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Layout>
        {/* greetings part */}
        {/* <div className={styles.greeting}>
          <span>
            Welcome <span className={styles.name}>{name}</span>!{" "}
          </span>
          Let <span className={styles.glowingText}>Lumos</span> illuminate your
          path at our
          <span className={styles.appName}> Enchanted Oasis!</span>
        </div> */}
        <div className={styles.notifications}>
          <NotifList />
        </div>
        <IconButton
          aria-label="compose"
          className={styles.composeMsg}
          icon={<EditIcon />}
          onClick={onOpen}
        />
        <ComposeMsgModal isOpen={isOpen} onClose={onClose} />
        {/* Compose mesaage modal */}
      </Layout>
    </>
  );
}
