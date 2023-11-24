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
