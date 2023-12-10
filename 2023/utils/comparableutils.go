package utils

func Contains[T comparable](s []T, e T) bool {
    for _, a := range s {
        if a == e {
            return true
        }
    }
    return false
}

func RemoveDuplicates(input []string) []string {
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