import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const harryPotterJokes: string[] = [
  "Why did Hermione open a bakery? She kneaded the dough for her success!",
  "Why did Hermione take up a job at the Ministry of Magic? She loves 'spell'-ing out new laws!",
  "What did Hermione say when Ron asked her to dance? 'You must be joking!'",
  "Why did Hermione bring a ladder to Hogwarts? To help her 'reach' the top of her class!",
  "Why did Hermione become a therapist? She was an expert at 'removing' people's problems!",
  "What's Hermione's favorite kind of exercise? Granger-robics!",
  "Why did Hermione become the editor of the Daily Prophet? She knew how to 'spell' the news correctly!",
  "Why was Hermione the best at magic chess? She knew the importance of the 'Hermione' maneuver!",
  "Why did Hermione start a knitting club at Hogwarts? She wanted to 'knit' Gryffindor scarves for everyone!",
  "Why did Hermione create her own magical creatures? She wanted to prove she could be 'Granger'-ous too!",
  "What do you call it when Hermione loses her temper? A 'Hermi-outburst'!",
  "Why did Hermione start a study group for Defense Against the Dark Arts? To help others 'spell' better!",
  "What's Hermione's favorite subject at Hogwarts? 'Wand'-ology!",
  "Why did Hermione become an author? She knew the power of 'spell'-ing out a good story!",
  "Why did Hermione become a detective? She was always 'Granger'-ous in solving mysteries!",
  "What's Hermione's favorite drink at The Three Broomsticks? 'Grainger'-ale!",
  "Why did Hermione start a gardening club at Hogwarts? She loved 'grow'-ing her own magical herbs!",
  "What did Hermione say when she received the highest marks in Potions class? 'It's just a little 'brew'-haha!'",
  "Why did Hermione become a Quidditch coach? She knew how to 'Granger'-ly train the best players!",
  "What's Hermione's favorite song? 'Don't Stop 'til You Granger-Enough!'",
  "Why did Hermione go to the Muggle world? She wanted to learn more about 'physics'-matics!",
  "What do you call it when Hermione starts dancing spontaneously? A 'Granger'-tainment show!",
  "Why did Hermione become a musician? She mastered the 'Hermione'-ca!",
  "Why did Hermione go to the beach? To show off her 'Granger'-ie swimsuit!",
  "What's Hermione's favorite type of puzzle? 'Granger'-saw puzzles!",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).send("Not logged in");
  }
  if (req.method === "GET") {
    return GET(req, res);
  } else {
    res.status(405).send("Method not allowed");
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { jokeType } = req.query;

  const joke =
    harryPotterJokes[Math.floor(Math.random() * harryPotterJokes.length)];
  return res.status(200).json(joke);
}
