package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"

	"github.com/nathanielhall/aoc/2023/utils"
)

type Point struct {
	x int
	y int
}

func main() {
	input := utils.ReadInput("input.txt")
	matrix := convertToMatrix(input)
	part1(matrix)
}

func part1(matrix [][]rune) {
	var currentNum []string
	var partNums []int

	for iRow, row := range matrix {
		for iCol, col := range row {
			isDigit := unicode.IsDigit(col)
			isLastCol := iCol == len(matrix[0])-1

			if isDigit {
				currentNum = append(currentNum, string(col))
			}
			if isDigit == false || (isDigit == true && isLastCol) {
				if len(currentNum) > 0 {
					n, _ := strconv.Atoi(strings.Join(currentNum, ""))

					start := Point{x: iRow, y: iCol - (len(currentNum))}
					end := Point{x: iRow, y: iCol - 1}
					fmt.Printf("%d %d:%d - %d:%d \n", n, start.x, start.y, end.x, end.y)

					foundSymbol := hasNeighboringSymbol(matrix, start, end)
					if foundSymbol {
						partNums = append(partNums, n)
					} else {
						fmt.Printf("No Symbol found: %d \n", n)
					}
				}
				currentNum = []string{}
			}
		}
	}

	sum := 0
	for _, v := range partNums {
		sum += v
	}
	fmt.Printf("Part 1: %d \n", sum)
	utils.CopyToClipboard(strconv.Itoa(sum))
}

func hasNeighboringSymbol(matrix [][]rune, start Point, end Point) bool {
	for i := start.y; i <= end.y; i++ {
		for xx := -1; xx <= 1; xx++ {
			for yy := -1; yy <= 1; yy++ {
				if xx == 0 && yy == 0 {
					continue
				}
				curr := Point{x: start.x, y: i}
				testPoint := Point{x: curr.x - xx, y: curr.y - yy}
				hasSymbol := isSymbol(matrix, testPoint)
				if hasSymbol {
					return true
				}
			}
		}
	}
	return false
}

func isSymbol(matrix [][]rune, point Point) bool {
	isNeg := point.x < 0 || point.y < 0
	isOffGrid := isNeg || point.x >= len(matrix) || point.y >= len(matrix[0])
	if isOffGrid {
		return false
	}
	p := matrix[point.x][point.y]
	return string(p) != "." && unicode.IsDigit(p) == false
}

func convertToMatrix(stringArray []string) [][]rune {
	var matrix [][]rune
	for _, rowStr := range stringArray {
		row := []rune(rowStr)
		matrix = append(matrix, row)
	}
	return matrix
}
