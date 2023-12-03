package main

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/nathanielhall/aoc/2023/utils"
)

type GameSet struct {
	red   int
	blue  int
	green int
}
type Game struct {
	id      int
	invalid bool
	sets    []GameSet
	totals  GameSet
	log     string
}

func main() {
	part1()
	part2()
}

func part1() {
	file, scanner, _ := utils.ChallengeInput()
	defer file.Close()
	max := GameSet{red: 12, green: 13, blue: 14}
	games := []Game{}

	for scanner.Scan() {
		game := scanner.Text()
		newGame := parseGame(game)
		invalid := false
		for _, s := range newGame.sets {
			if s.blue > max.blue || s.green > max.green || s.red > max.red {
				invalid = true
				break
			}
		}
		newGame.invalid = invalid
		games = append(games, newGame)
	}
	valid := utils.Filter(games, func(g Game) bool {
		return g.invalid == false
	})
	sum := 0
	s := 0
	for _, x := range valid {
		sum += x.id
		s++
	}
	fmt.Printf("Part 1: %d games with a total of %d \n", s, sum)
	utils.CopyToClipboard(strconv.Itoa(sum))
}
func part2() {
	file, scanner, _ := utils.ChallengeInput()
	defer file.Close()
	sum := 0
	games := []Game{}
	for scanner.Scan() {
		game := scanner.Text()
		newGame := parseGame(game)
		x := newGame.totals
		power := x.blue * x.green * x.red
		sum += power
		games = append(games, newGame)
	}
	fmt.Printf("Part 2: %d \n", sum)
	utils.CopyToClipboard(strconv.Itoa(sum))
}

func parseGame(input string) Game {
	totals := GameSet{red: 0, blue: 0, green: 0}
	game := Game{}

	gameDetails := strings.Split(input, ":")
	id, _ := strconv.Atoi(strings.ReplaceAll(gameDetails[0], "Game ", ""))
	game.id = id
	game.log = input

	gameSets := strings.Split(gameDetails[1], ";")

	sets := []GameSet{}

	for _, s := range gameSets {
		gameSet := GameSet{red: 0, blue: 0, green: 0}

		for _, gameType := range strings.Split(s, ",") {
			parts := strings.Split(strings.Trim(gameType, " "), " ")
			color := parts[1]
			colorNum, _ := strconv.Atoi(parts[0])

			if color == "red" {
				gameSet.red += colorNum
				if colorNum > totals.red {
					totals.red = colorNum
				}
			}
			if color == "blue" {
				gameSet.blue += colorNum
				if colorNum > totals.blue {
					totals.blue = colorNum
				}
			}
			if color == "green" {
				gameSet.green += colorNum
				if colorNum > totals.green {
					totals.green = colorNum
				}
			}
		}

		sets = append(sets, gameSet)
	}
	game.sets = sets
	game.totals = totals

	return game
}
