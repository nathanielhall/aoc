package utils

import (
	"bufio"
	"os"
)

func ChallengeInput() (*os.File, *bufio.Scanner, error) {
	file, err := os.Open("input.txt")
	if err != nil {
		return nil, nil, err
	}
	scanner := bufio.NewScanner(file)
	return file, scanner, nil
}
 
func ReadInput(input string) []string {
	file, err := os.Open(input)
	if err != nil {
		panic("Error reading file")
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	
	for scanner.Scan() {
		line := scanner.Text()
		lines = append(lines, line)
	}

	return lines
}

 
