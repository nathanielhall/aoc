package utils

func Filter[T any](s []T, cond func(t T) bool) []T {
	res := []T{}
	for _, v := range s {
		if cond(v) {
			res = append(res, v)
		}
	}
	return res
}
func Find[T any](items []T, cond func(t T) bool) (T, bool) {
	var res T
	for _, v := range items {
		if cond(v) {
			return v, true
		}
	}
	return res, false
}