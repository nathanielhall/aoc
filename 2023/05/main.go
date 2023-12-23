package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/nathanielhall/aoc/2023/utils"
)

func main() {
	content, err := os.ReadFile("input.txt")
	if err != nil {
		panic("Error reading file")
	}

	lines := strings.Split(string(content), "\n\n")
	seeds, blocks := utils.SplitIntegers(lines[0], " "), lines[1:]

	var ranges [][][]int
	for _, l := range blocks {
		var blockItems [][]int
		splitByColon := strings.Split(l, ":")
		trimRight := strings.TrimLeft(splitByColon[1], "\n")
		for _, r := range strings.Split(trimRight, "\n") {
			var items []int
			for _, x := range strings.Split(r, " ") {
				i, _ := strconv.Atoi(x)
				items = append(items, i)
			}
			blockItems = append(blockItems, items)
		}

		ranges = append(ranges, blockItems)
	}

	fmt.Printf("Seeds: %d \n", seeds)
	fmt.Println("Ranges")
	for j, k := range ranges {
		fmt.Printf("[%d] = %d \n", j, k)
	}

	var totals []int
	for _, s := range seeds {
		currentValue := s
		for blockIdx, block := range ranges {

			for _, item := range block {
				x, y, z := item[0], item[1], item[2]
				lh := y + z - 1

				if currentValue >= y && currentValue <= lh {
					diff := currentValue - y
					currentValue = x + diff
					break
				}
			}
			fmt.Printf("Seed %d Block %d Value %d \n", s, blockIdx, currentValue)
		}
		totals = append(totals, currentValue)
		fmt.Println()
	}

	min := totals[0]
	for _, x := range totals {
		if x < min {
			min = x
		}
	}

	fmt.Printf("Totals %d \n", totals)
	fmt.Printf("Part 1: %d \n", min)
	utils.CopyToClipboard(strconv.Itoa(min))

}
