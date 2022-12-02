import { readLines } from "../../utils.ts";

enum Hand {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
const getHands = () => {
  const Rock = {
    cipher: ["A", "X"],
    value: Hand.Rock,
    win: Hand.Scissors,
    loose: Hand.Paper,
  };
  const Paper = {
    cipher: ["B", "Y"],
    value: Hand.Paper,
    win: Hand.Rock,
    loose: Hand.Scissors,
  };
  const Scissors = {
    cipher: ["C", "Z"],
    value: Hand.Scissors,
    win: Hand.Paper,
    loose: Hand.Rock,
  };

  return [Rock, Paper, Scissors];
};

const playResult = (opponent: number, me: number) => {
  if (me === opponent) return 3; // Draw
  // Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
  if (me === Hand.Rock && opponent === Hand.Scissors) return 6;
  if (me === Hand.Scissors && opponent === Hand.Paper) return 6;
  if (me === Hand.Paper && opponent === Hand.Rock) return 6;

  return 0;
};

async function part1() {
  const text = await Deno.readTextFile("./input.txt");
  const lines = readLines(text).extract();
  const hands = getHands();

  const result = lines.map((line) => {
    const [opponent, me] = line.split(" ");

    const opponentHand = hands.find((x) => x.cipher.includes(opponent));
    const myHand = hands.find((x) => x.cipher.includes(me));

    if (!opponentHand || !myHand) throw Error("Unknown value");

    const myScore = myHand.value + playResult(opponentHand.value, myHand.value);

    return {
      myScore,
    };
  });

  const sum = result.reduce((a, b) => a + b.myScore, 0);
  console.log("Part 1", sum);
}

async function part2() {
  const text = await Deno.readTextFile("./input.txt");
  const lines = readLines(text).extract();

  const hands = getHands();
  const result = lines.map((line) => {
    const [opponentCipher, resultCipher] = line.split(" ");

    const opponentHand = hands.find((x) => x.cipher.includes(opponentCipher));
    if (!opponentHand) throw Error("Unknown value");

    const opponentAction = resultCipher === "X"
      ? "win"
      : (resultCipher === "Z" ? "loose" : "value");

    const myHandValue = opponentHand[opponentAction];

    const myScore = myHandValue + playResult(opponentHand.value, myHandValue);

    return {
      myScore,
    };
  });

  const sum = result.filter(Boolean).reduce((a, b) => a + b.myScore, 0);
  console.log("Part 2", sum);
}

part1();
part2();
