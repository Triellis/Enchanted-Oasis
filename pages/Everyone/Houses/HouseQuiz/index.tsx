import {
  Box,
  Heading,
  VStack,
  Radio,
  RadioGroup,
  Button,
  Text,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./HouseQuiz.module.css";
import classNames from "classnames";

type Question = {
  id: number;
  question: string;
  options: { label: string; points: number }[];
};

const questions: Question[] = [
  {
    id: 1,
    question: "Which quality do you value most in yourself?",
    options: [
      { label: "Bravery", points: 10 },
      { label: "Intelligence", points: 8 },
      { label: "Loyalty", points: 6 },
      { label: "Ambition", points: 4 },
    ],
  },
  {
    id: 2,
    question: "How would you prefer to spend your free time?",
    options: [
      { label: "Exploring the outdoors", points: 6 },
      { label: "Reading books", points: 8 },
      { label: "Hanging out with friends", points: 4 },
      { label: "Pursuing personal goals", points: 10 },
    ],
  },
  {
    id: 3,
    question: "What kind of people do you admire?",
    options: [
      { label: "Those who stand up for what's right", points: 10 },
      { label: "Those who are exceptionally talented", points: 8 },
      { label: "Those who are always there for their loved ones", points: 6 },
      { label: "Those who achieve great success", points: 4 },
    ],
  },
  {
    id: 4,
    question: "Which magical creature fascinates you the most?",
    options: [
      { label: "Dragons", points: 4 },
      { label: "Phoenixes", points: 6 },
      { label: "Centaurs", points: 8 },
      { label: "Merpeople", points: 10 },
    ],
  },
  {
    id: 5,
    question: "How do you handle challenging situations?",
    options: [
      { label: "Face them head-on", points: 10 },
      { label: "Analyze and strategize", points: 8 },
      { label: "Seek support from others", points: 6 },
      { label: "Find alternative solutions", points: 4 },
    ],
  },
  {
    id: 6,
    question: "Which Hogwarts subject interests you the most?",
    options: [
      { label: "Defense Against the Dark Arts", points: 10 },
      { label: "Potions", points: 6 },
      { label: "Herbology", points: 8 },
      { label: "Charms", points: 4 },
    ],
  },
  {
    id: 7,
    question: "What kind of environment makes you feel most at home?",
    options: [
      { label: "Mountainous regions", points: 4 },
      { label: "Urban cityscapes", points: 6 },
      { label: "Countryside settings", points: 8 },
      { label: "Coastal areas", points: 10 },
    ],
  },
  {
    id: 8,
    question: "Which quote resonates with you the most?",
    options: [
      {
        label: ' "It is our choices that show what we truly are."',
        points: 10,
      },
      {
        label:
          ' "Words are, in my not-so-humble opinion, our most inexhaustible source of magic."',
        points: 8,
      },
      {
        label:
          ' "Happiness can be found even in the darkest of times if one only remembers to turn on the light."',
        points: 6,
      },
      {
        label:
          ' "We\'ve all got both light and dark inside us. What matters is the part we choose to act on."',
        points: 4,
      },
    ],
  },
  {
    id: 9,
    question: "What role would you prefer in a group project?",
    options: [
      { label: "The leader", points: 4 },
      { label: "The problem solver", points: 6 },
      { label: "The peacemaker", points: 8 },
      { label: "The motivator", points: 10 },
    ],
  },
  {
    id: 10,
    question: "How do you define success?",
    options: [
      { label: "Accomplishing personal goals", points: 10 },
      { label: "Acquiring knowledge and wisdom", points: 8 },
      { label: "Building strong relationships", points: 6 },
      { label: "Gaining power and influence", points: 4 },
    ],
  },
];

const SortingHatForm: React.FC = () => {
  const [scores, setScores] = useState<number[]>(
    Array(questions.length).fill(0)
  );

  const handleOptionChange = (questionIndex: number, points: number) => {
    const newScores = [...scores];
    newScores[questionIndex] = points;
    setScores(newScores);
  };

  const calculateTotalPoints = () =>
    scores.reduce((total, points) => total + points, 0);

  const getHouseFromPoints = (totalPoints: number) => {
    if (totalPoints >= 70) return "Slytherin";
    if (totalPoints >= 60 && totalPoints <= 69) return "Gryffindor";
    if (totalPoints >= 50 && totalPoints <= 59) return "Ravenclaw";
    if (totalPoints >= 40 && totalPoints <= 49) return "Hufflepuff";
    return "Please respond to all the questions"; // Handle cases outside the defined ranges
  };

  const toast = useToast();

  const handleSubmit = () => {
    const totalPoints = calculateTotalPoints();
    const house = getHouseFromPoints(totalPoints);

    if (house === "Please respond to all the questions") {
      return toast({
        title: `Please respond to all the questions`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    const houseColors: { [key: string]: string } = {
      Slytherin: "green.900",
      Gryffindor: "blue.900",
      Ravenclaw: "yellow.900",
      Hufflepuff: "red.900",
    };

    toast({
      title: `Congratulations!`,
      description: `You belong to ${house}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
      containerStyle: {
        background: houseColors[house],
        color: "white",
      },
    });
  };

  return (
    <div>
      <Heading className={styles.header}>Hogwarts House Sorting Quiz</Heading>
      <Grid templateColumns="1fr" className={styles.form}>
        {questions.map((question, index) => (
          <GridItem key={question.id} className={styles.questionBox}>
            <VStack align="start">
              <Text fontWeight="bold">{question.question}</Text>
              <RadioGroup
                onChange={(value) => handleOptionChange(index, parseInt(value))}
                value={`${scores[index]}`}
              >
                <VStack align="start">
                  {question.options.map((option) => (
                    <Radio key={option.label} value={`${option.points}`}>
                      {option.label} ({option.points} points)
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
            </VStack>
          </GridItem>
        ))}
      </Grid>
      <Button
        className={classNames(styles.submitBtn, "clicky")}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default SortingHatForm;
