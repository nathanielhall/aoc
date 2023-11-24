package main

import (
	"fmt"
	"log"

	"github.com/nathanielhall/aoc/cmd/utils"
)

func main() {
	part1()
	part2()
}

func part1() {
	file, scanner, err := utils.ChallengeInput()
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	priorityMap := getPriorityMap()

	sum := 0
	for scanner.Scan() {
		line := scanner.Text()

		length := len(line)
		halfLength := length / 2
		left := line[:halfLength]
		right := line[halfLength:]

		d := firstDuplicate([]string{left, right})

		sum += priorityMap[d]
	}

	fmt.Printf("Part 1: %d\n", sum)
}

func part2() {
	file, scanner, err := utils.ChallengeInput()
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	priorityMap := getPriorityMap()

	lines := []string{}
	sum := 0

	for scanner.Scan() {
		lines = append(lines, scanner.Text())

		if len(lines) == 3 {
			d := firstDuplicate(lines)
			sum += priorityMap[d]
			lines = []string{}
		}
	}

	fmt.Printf("Part 2: %d\n", sum)
}

func firstDuplicate(arrOfStrings []string) rune {
	for _, x := range arrOfStrings[0] {
		for i := 1; i < len(arrOfStrings); i++ {
			found := false
			for _, y := range arrOfStrings[i] {
				if x == y {
					found = true
					break
				}
			}
			// not found, break out of searching for this char (x)
			if found == false {
				break
			}

			if found == true && i == len(arrOfStrings)-1 {
				return x
			}
		}
	}
	return 0
}

func getPriorityMap() map[rune]int {
	priorityMap := make(map[rune]int)
	alphabet := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

	for i, char := range alphabet {
		priorityMap[char] = i + 1
	}
	return priorityMap
}