package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	part1 := calc([]string{"1", "2", "3", "4", "5", "6", "7", "8", "9"})
	fmt.Printf("Part 1: %d \n", part1)
	part2 := calc([]string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"})
	fmt.Printf("Part 2: %d \n", part2)
}

func calc(numbers []string) int {
	input, _ := os.ReadFile("input.txt")
	sum := 0
	for _, line := range strings.Fields(string(input)) {
		first, last := firstAndLastOccurance(line, numbers)
		combinedStrings := strconv.Itoa(first) + strconv.Itoa(last)
		result, _ := strconv.Atoi(combinedStrings)
		sum += result
	}
	return sum
}

func firstAndLastOccurance(input string, numbers []string) (first int, last int) {
	var lookup = map[string]int{"zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "0": 0}
	firstRegEx := regexp.MustCompile(`(` + strings.Join(numbers, "|") + `)`)
	lastRegEx := regexp.MustCompile(`.*(` + strings.Join(numbers, "|") + `)`)
	firstMatch := firstRegEx.FindStringSubmatch(input)[1]
	lastMatch := lastRegEx.FindStringSubmatch(input)[1]
	return lookup[firstMatch], lookup[lastMatch]
}
