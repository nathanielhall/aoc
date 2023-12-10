package datastructures

type Stack[T any] struct {
	keys []T
}

func NewStack[T any]() *Stack[T] {
	return &Stack[T]{nil}
}

func (stack *Stack[T]) Push(key T) {
	stack.keys = append(stack.keys, key)
}

func (stack *Stack[T]) Top() (T, bool) {
	var x T
	if len(stack.keys) > 0 {
		x = stack.keys[len(stack.keys)-1]
		return x, true
	}
	return x, false
}

func (stack *Stack[T]) Pop() (T, bool) {
	var x T
	if len(stack.keys) > 0 {
		x, stack.keys = stack.keys[len(stack.keys)-1], stack.keys[:len(stack.keys)-1]
		return x, true
	}
	return x, false
}

func (stack *Stack[T]) IsEmpty() bool {
	return len(stack.keys) == 0
}
// type (
// 	Stack struct {
// 		top *node
// 		length int
// 	}
// 	node struct {
// 		value interface{}
// 		prev *node
// 	}	
// )
// // Create a new stack
// func New() *Stack {
// 	return &Stack{nil,0}
// }
// // Return the number of items in the stack
// func (this *Stack) Len() int {
// 	return this.length
// }
// // View the top item on the stack
// func (this *Stack) Peek() interface{} {
// 	if this.length == 0 {
// 		return nil
// 	}
// 	return this.top.value
// }
// // Pop the top item of the stack and return it
// func (this *Stack) Pop() interface{} {
// 	if this.length == 0 {
// 		return nil
// 	}
	
// 	n := this.top
// 	this.top = n.prev
// 	this.length--
// 	return n.value
// }
// // Push a value onto the top of the stack
// func (this *Stack) Push(value interface{}) {
// 	n := &node{value,this.top}
// 	this.top = n
// 	this.length++
// }