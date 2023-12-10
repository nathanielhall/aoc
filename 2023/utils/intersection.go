package utils

// function for finding the intersection of two arrays
func Intersection(arr1, arr2 []int) []int {
	intersection := make([]int, 0)

	set := make(map[int]bool)

	// Create a set from the first array
	for _, num := range arr1 {
		set[num] = true // setting the initial value to true
	}

	// Check elements in the second array against the set
	for _, num := range arr2 {
		if set[num] {
			intersection = append(intersection, num)
		}
	}

	return intersection
}