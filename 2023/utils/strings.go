package utils

import (
	"strconv"
	"strings"
)

// String Manipulation helpers

// Read string containing integers separated by particular separator.Return array of int
func SplitIntegers(s string, sep string) []int {
	var nums []int
	for _, strNum := range strings.Split(s, sep) {
		i, err := strconv.Atoi(strNum)
		// ignore blank spaces
		if err != nil {
			continue
		}

		nums = append(nums, i)
	}
	return nums
}
