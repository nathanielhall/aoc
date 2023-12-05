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
	for _, row := range matrix {
		for _, col := range row {
			cell := string(col)
			fmt.Printf("%s  ", cell)
		}
		fmt.Println("")
	}
	part2(matrix)
}

func part2(matrix [][]rune) {
	sum := 0
	for iRow, row := range matrix {
		for iCol, col := range row {
			match := string(col) == "*"
			if match {
				point := Point{x: iRow, y: iCol}
				exists, part1, part2 := adjacentPartNums(matrix, point)
				if exists {
					p1, _ := strconv.Atoi(part1)
					p2, _ := strconv.Atoi(part2)
					sum += p1 * p2
				}
			}
		}
	}

	fmt.Printf("Part 1: %d \n", sum)
	utils.CopyToClipboard(strconv.Itoa(sum))
}

func adjacentPartNums(matrix [][]rune, point Point) (exists bool, num1 string, num2 string) {
	var partNums []string
	for xx := -1; xx <= 1; xx++ {
		for yy := -1; yy <= 1; yy++ {
			curr := Point{x: point.x - xx, y: point.y - yy}
			if xx == 0 && yy == 0 {
				continue
			}
			cell := matrix[curr.x][curr.y]
			isDigit := unicode.IsDigit(cell)
			if isDigit  {
				partNumber := readPartNumber(matrix, curr)
				partNums = append(partNums, partNumber)
			}
		}
	}
	x := removeDuplicates(partNums)
	if len(x) == 2 {
		return true, x[0], x[1]
	} 
	return false, "", ""
}

func readPartNumber(matrix [][]rune, point Point) string {
	var partNum []string
	colLen := len(matrix[0])
	foundY := false

	for y := 0; y < colLen; y++ {
		if y == point.y {
			foundY = true
		}
		cell := matrix[point.x][y]
		isLastCol := y == len(matrix[0])-1

		isDigit := unicode.IsDigit(cell)
		if isDigit {
			partNum = append(partNum, string(cell))
		}
		if isDigit == false || (isDigit == true && isLastCol) {
			if foundY {
				break
			}
			partNum = []string{}
		}
	}
	return strings.Join(partNum, "")
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
					foundSymbol := hasNeighboringSymbol(matrix, start, end)
					if foundSymbol {
						partNums = append(partNums, n)
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
func contains[T comparable](s []T, e T) bool {
    for _, a := range s {
        if a == e {
            return true
        }
    }
    return false
}

func removeDuplicates(input []string) []string {
	uniqueMap := make(map[string]bool)
	var result []string
	for _, num := range input {
		if !uniqueMap[num] {
			result = append(result, num)
			uniqueMap[num] = true
		}
	}
	return result
}