package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

type Command interface {
	execute(amount int) (int, int)
}

type UpCommand struct{}

func (p *UpCommand) execute(amount int) (int, int) {
	return 0, -amount
}

type DownCommand struct{}

func (p *DownCommand) execute(amount int) (int, int) {
	return 0, amount
}

type ForwardCommand struct{}

func (p *ForwardCommand) execute(amount int) (int, int) {
	return amount, 0
}

func main() {
	input := getInput()
	lines := strings.Split(input, "\n")

	commands := map[string]Command{
		"up":      &UpCommand{},
		"down":    &DownCommand{},
		"forward": &ForwardCommand{},
	}

	for _, line := range lines {
		parts := strings.Split(line, " ")
		amount, err := strconv.Atoi(parts[1])
		if err != nil {
			log.Fatal("Error")
		}
		name := parts[0]
		if command := commands[name]; command == nil {
			fmt.Println("No command found for this name")
		} else {
			x, y := command.execute(amount)
			fmt.Printf("%s - %d, %d \n", name, x, y)
		}
	}

}

func getInput() string {
	return `forward 5
down 5
forward 8
up 3
down 8
forward 2`
}
