package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

type elf struct {
	elfNumber int
	calories  int
}

func main() {
	// read the entire file & return the byte slice as a string
	content, err := os.ReadFile("./input.txt")
	if err != nil {
		panic(err)
	}
	// trim off new lines and tabs at end of input files
	strContent := string(content)

	lines := strings.Split(strContent, "\n\n")

	var caloriesPerElf []elf
	for i, group := range lines {
		total := sum(strings.Split(group, "\n"))
		currentElf := elf{i + 1, total}
		caloriesPerElf = append(caloriesPerElf, currentElf)
	}

	var max int = 0
	for _, e := range caloriesPerElf {
		fmt.Printf("Elf %d has %v calories", e.elfNumber, e.calories)
		fmt.Println()
		if e.calories > max {
			max = e.calories
		}
	}

	fmt.Println(max)

	sort.Slice(caloriesPerElf, func(i, j int) bool {
		return caloriesPerElf[i].calories < caloriesPerElf[j].calories
	})

	for _, e := range caloriesPerElf {
		fmt.Printf("Elf %d has %v calories", e.elfNumber, e.calories)
		fmt.Println()
	}


	fmt.Println(65573 + 67568 + 70764)
}

// Convert string to int, Sum
func sum(array []string) int {
	result := 0
	for _, v := range array {
		i, err := strconv.Atoi(v)
		if err != nil {
			fmt.Println(err)
		} else {
			result += i
		}
	}
	return result
}
