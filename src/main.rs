// Advent of Code
use std::env;
use crate::day1::Day1;
mod day1;
use crate::day2::Day2;
mod day2;
mod command;
pub use crate::command::Command;

struct Director {
	commands: Vec<Box<dyn Command>>
}

impl Director {
	fn new() -> Self {
		Self { commands: vec![] }
	}
	fn add(&mut self, cmd: Box<dyn Command>) {
		self.commands.push(cmd);
	}
    fn execute(&self, day:i32) {
		// TODO: if no found, print msg!
        self.commands.iter().filter(|cmd| cmd.get_day() == day).map(|cmd| cmd.execute()).collect()
    }
}

fn main() {
  let args: Vec<String> = env::args().collect();
  let config = parse_config(&args);

  let mut director = Director::new();
  let cmd = Box::new(Day1);
  director.add(cmd);

  let cmd = Box::new(Day2);
  director.add(cmd);

  director.execute(config.day); // execute all commands
}

struct Config {
	day: i32,
}

fn parse_config(args: &[String]) -> Config {
	let day: i32 = args[1].clone().parse::<i32>().unwrap();
	Config { day }
}