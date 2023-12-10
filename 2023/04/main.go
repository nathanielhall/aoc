package main

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/nathanielhall/aoc/2023/pkg/datastructures"
	"github.com/nathanielhall/aoc/2023/utils"
)

type Card struct {
	id      int
	nums    []int
	winners []int
	matches []int
	score   int
}
type Point struct {
	x int
	y int
}

func main() {
	lines := utils.ReadInput("input.txt")
	part1(lines)
	part2(lines)
}

func part2(lines []string) {
	numLines := len(lines)

	// Create "copies" lookup by card number (index)
	copies := make([][]int, numLines)
	for i, line := range lines {
		card := readCard(line)
		numMatches := len(card.matches)
		copies[i] = make([]int, numMatches)
		for j := card.id + 1; j <= numMatches+card.id; j++ {
			copies[i][j-card.id-1] = j
		}
	}

	// Calculate a score for each card -- card plus copies
	//  -- Each card can have copies, that also have copies
	//  -- So, turn this into a tree, then iterate to count

	total := 0
	for idx := range copies {
		count := countCopies(idx+1, copies)
		// count original card
		count++
		// fmt.Printf("Card %d has %d instances \n", idx+1, count)
		total += count
	}

	fmt.Printf("Part 2: %d \n", total)
	utils.CopyToClipboard(strconv.Itoa(total))
}

func countCopies(cardNum int, matrix [][]int) int {
	sum := 0
	stack := datastructures.NewStack[Point]()

	// Push copies for incoming card num
	for idx := range matrix[cardNum-1] {
		stack.Push(Point{x: cardNum - 1, y: idx})
	}
	for stack.IsEmpty() == false {
		curr, _ := stack.Pop()

		cardNum := matrix[curr.x][curr.y]
		sum++

		if len(matrix[cardNum-1]) == 0 {
			continue
		}
		// push all copies of this card num
		for y := 0; y < len(matrix[cardNum-1]); y++ {
			stack.Push(Point{x: cardNum - 1, y: y})
		}
	}
	return sum
}

func part1(lines []string) {
	sum := 0
	for _, line := range lines {
		c := readCard(line)
		sum += c.score
	}
	fmt.Printf("Part 1: %d \n", sum)
	utils.CopyToClipboard(strconv.Itoa(sum))
}

func readCard(line string) Card {
	splitByColon := strings.Split(line, ":")

	n := strings.TrimSpace(strings.Replace(splitByColon[0], "Card", "", 1)) 
	cardNum, _ := strconv.Atoi(n)

	v := strings.Split(splitByColon[1], "|")

	nums := utils.SplitIntegers(v[0], " ")
	winners := utils.SplitIntegers(v[1], " ")

	matches := utils.Intersection(winners, nums)

	score := 0
	prev := 1
	for i := range matches {
		if i == 0 {
			score = 1
		} else {
			score = prev * 2
		}
		prev = score
	}

	return Card{id: cardNum, winners: winners, nums: nums, matches: matches, score: score}
}