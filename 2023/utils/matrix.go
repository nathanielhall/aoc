package utils

func ConvertToMatrix(stringArray []string) [][]rune {
	var matrix [][]rune
	for _, rowStr := range stringArray {
		row := []rune(rowStr)
		matrix = append(matrix, row)
	}
	return matrix
}