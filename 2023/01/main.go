package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"
	"unicode"

	"github.com/nathanielhall/aoc/2023/utils"
)

func main() {
	part1()
	part2()
}

func part2() {
	file, scanner, err := utils.ChallengeInput()
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	sum := 0
	for scanner.Scan() {
		line := scanner.Text()
		nums := parseNumsSpelledOut(line)

		num1 := strconv.Itoa(nums[0])
		num2 := num1
		if len(nums) > 1 {
			num2 = strconv.Itoa(nums[len(nums)-1])
		}

		combinedStrings := num1 + num2
		result, _ := strconv.Atoi(combinedStrings)

		sum += result

	}
	fmt.Printf("Part 1: %d \n", sum)
	utils.CopyToClipboard(strconv.Itoa(sum))
}

func part1() {
	file, scanner, err := utils.ChallengeInput()
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	sum := 0
	for scanner.Scan() {
		line := scanner.Text()
		nums := parseNums(line)

		num1 := strconv.Itoa(nums[0])
		num2 := num1
		if len(nums) > 1 {
			num2 = strconv.Itoa(nums[len(nums)-1])
		}

		combinedStrings := num1 + num2
		result, _ := strconv.Atoi(combinedStrings)

		sum += result

	}
	fmt.Printf("Part 2: %d \n", sum)
	utils.CopyToClipboard(strconv.Itoa(sum))
}

func parseNums(line string) []int {
	var numbers []int
	for _, r := range line {
		if unicode.IsDigit(r) {
			s := string(r)
			num, _ := strconv.Atoi(s)
			numbers = append(numbers, num)
		}
	}
	return numbers
}

func parseNumsSpelledOut(line string) []int {
	var numbers = []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	var lookup = map[string]int{"zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "0": 0}
	// var matches = map[string]int{}
	type Match struct {
		Key   string
		Value int
	}

	var matches []Match

	// numSpelling, index
	for _, n := range numbers {
		occurrences := findAllOccurrences(line, n)
		for _, o := range occurrences {
			matches = append(matches, Match{Key: n, Value: o})
		}
	}

	// num, index
	for i, r := range line {
		if unicode.IsDigit(r) {
			s := string(r)
			matches = append(matches, Match{Key: s, Value: i})
		}
	}

	firstOccurance := matches[0]
	lastOccurance := matches[0]
	for _, m := range matches {
		if m.Value < firstOccurance.Value {
			firstOccurance = m
		}
		if m.Value > lastOccurance.Value {
			lastOccurance = m
		}
	}

	return []int{lookup[firstOccurance.Key], lookup[lastOccurance.Key]}
}

func findAllOccurrences(s, substring string) []int {
	var occurrences []int
	index := -1
	startIndex := 0

	for {
		index = strings.Index(s[startIndex:], substring)
		if index == -1 {
			break
		}
		occurrences = append(occurrences, startIndex+index)
		startIndex += index + len(substring)
	}

	return occurrences
}
