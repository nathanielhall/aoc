// Advent of Code
use std::env;
mod day1;

fn main() {
	let args: Vec<String> = env::args().collect();
	let config = parse_config(&args);

	// TODO: Need a way to reuse logic and simplify each aoc challenge
	// look into using a command pattern that executes a command/day by cli arg
	// https://rust-unofficial.github.io/patterns/patterns/behavioural/command.html

	if config.day == 1 {
		// open file for this day, send to execute?
		day1::execute(config.day);
	} else {
		println!("This day is not yet available")
	}
}

struct Config {
	day: i32,
}

fn parse_config(args: &[String]) -> Config {
	// let day = args[1].clone();
	let day: i32 = args[1].clone().parse::<i32>().unwrap();
	Config { day }
}
