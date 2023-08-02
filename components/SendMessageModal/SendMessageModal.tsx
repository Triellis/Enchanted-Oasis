import {
  Button,
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
  useToast,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import classNames from "classnames";
import { ReducerAction, useEffect, useReducer, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./SendMessageModal.module.css";
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

  badgeText: string;
  badgeColor: string;
  body: string;
  audience?: string;
  attachment?: string;
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

    case "attachment":
      return { ...state, attachment: action.payload };
    default:
      return state;
  }
}

async function sendMessage(
  data: NotifData,
  courseId: string | undefined,
  onClose: any,
  toast: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  mutate: any | undefined
) {
  setIsLoading(true);
  let url;
  if (courseId) {
    url = `/api/course/${courseId}/notifications`;
    delete data.audience;
  } else {
    url = "/api/notification";
    delete data.attachment;
  }
  const res = await fetch(url, {
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

    if (mutate) mutate();
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
  setIsLoading(false);
}
export default function SendMessageModal({
  isOpen,
  onClose,
  courseId,
  mutate,
}: {
  isOpen: boolean;
  onClose: () => void;
  courseId?: string;
  mutate?: any;
}) {
  const toast = useToast();
  const [data, dispatchData] = useReducer(mutateData, {
    title: "",
    audience: "All",
    badgeText: "",
    badgeColor: "red",
    body: "",
    attachment: "",
  });

  function validation() {
    for (let field of Object.keys(data)) {
      if (field !== "attachment" && (data as any)[field].trim() === "") {
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
  // for reseting the modal:
  useEffect(() => {
    if (isOpen) {
      dispatchData({
        type: "badgeColor",
        payload: "red",
      });
      dispatchData({
        type: "audience",
        payload: "All",
      });
      dispatchData({
        type: "title",
        payload: "",
      });
      dispatchData({
        type: "badgeText",
        payload: "",
      });
      dispatchData({
        type: "body",
        payload: "",
      });
      dispatchData({
        type: "attachment",
        payload: "",
      });
    }
  }, [isOpen]);

  // for loading animation
  const [isLoading, setIsLoading] = useState(false);

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
            {courseId ? (
              <Input
                placeholder="Attachment google drive link"
                value={data.attachment}
                onChange={(e) => {
                  dispatchData({ type: "attachment", payload: e.target.value });
                }}
              />
            ) : (
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
            )}

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
          <Button className="modalNoBtn" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="modalYesBtn"
            isLoading={isLoading}
            onClick={() => {
              if (!validation()) return;

              sendMessage(data, courseId, onClose, toast, setIsLoading, mutate);
            }}
          >
            Send Message
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
