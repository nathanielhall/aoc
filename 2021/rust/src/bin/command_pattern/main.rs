// #![feature(array_windows)]
// #![feature(array_from_fn)]
// #![feature(slice_group_by)]

// Advent of Code
// use crate::day1::Day1;
// use std::env;
// mod day1;
// use crate::day2::Day2;
mod command;
// mod day2;
pub use crate::command::Command;

// pub(crate) mod stdx;

// struct Director {
//     commands: Vec<Box<dyn Command>>,
// }

// impl Director {
    // fn new() -> Self {
    //     Self { commands: vec![] }
    // }
    // fn add(&mut self, cmd: Box<dyn Command>) {
    //     self.commands.push(cmd);
    // }
    // fn execute(&self, day: i32) {
    //     // TODO: if no found, print msg!
    //     self.commands
    //         .iter()
    //         .filter(|cmd| cmd.get_day() == day)
    //         .map(|cmd| cmd.execute())
    //         .collect()
    // }
// }

fn main() {
    // let args: Vec<String> = env::args().collect();
    // let config = parse_config(&args);

    // let mut director = Director::new();

    // director.add(Box::new(Day1));
    // director.add(Box::new(Day2));

    // director.execute(config.day); // execute a command based on incoming day
}

// struct Config {
//     day: i32,
// }

// fn parse_config(args: &[String]) -> Config {
//     let day: i32 = args[1].clone().parse::<i32>().unwrap();
//     Config { day }
// }
