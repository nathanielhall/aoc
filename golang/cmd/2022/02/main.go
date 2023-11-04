package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

const (
	Loose = 0
	Draw = 1
	Win = 6
)
const (
	RockPoints = 1
	PaperPoints = 2
	ScissorPoints = 3
)

func getScore(line string) int {
	lookup :=  map[string]int{
		"A X": RockPoints + Draw,
	    "A Y": PaperPoints + Win,
		"A Z": ScissorPoints + Loose,
		"B X": RockPoints + Loose,
		"B Y": PaperPoints + Draw,
		"B Z": ScissorPoints + Win,
		"C X": RockPoints + Win,
		"C Y": PaperPoints + Loose,
		"C Z": ScissorPoints + Draw,
	}
	
	return lookup[line]
}


func main() {
	content, err := os.Open("input.txt")

	if err != nil {
		log.Fatal(err)
	}

	defer content.Close()

	scanner := bufio.NewScanner(content)

	sum := 0
	for scanner.Scan() {
		line := scanner.Text()
		score := getScore(line)

		sum += score
		fmt.Printf("%s : %d : %d \n", line, score, sum)

	}

	fmt.Printf("RESULT: %d", sum)
}

// Round Result (Outcome)
// Lost = 0
// Draw = 3
// Win = 6

// Shape Points
// Rock = 1
// Paper = 2
// Scissors = 3

// A = Rock
// B = Paper
// C = Scissors
// X = Rock
// Y = Paper
// Z = Scissors