pub use crate::command::Command;

pub struct Day1;
impl Command for Day1 {
    fn get_day(&self) -> i32 {
        1
    }
    fn execute(&self) {
        run();
    }
}
fn run() {
    let input = include_str!("input.day1.txt");

    let nums: Vec<u16> = input
        .lines()
        .map(|line| line.parse::<u16>().unwrap())
        .collect();

    for i in nums.iter() {
        println!("Numbers {}", i)
    }

    //.filter(|[a, b]| b > a)
}

// use crate::stdx::IterExt;
// Advent of code:: Day 1
// https://adventofcode.com/2021/day/1
// use std::env;
// use std::fs::File;
// use std::io::{self, BufRead};
// use std::path::Path;

// use std::slice::{ArrayWindows};
// #![feature(array_windows)]
//
// pub fn execute(day: i32) {
//     // let args: Vec<String> = env::args().collect();
//     // let config = parse_config(&args);
//     let filename = format!("./src/input.day{}.txt", day);
//     // File hosts must exist in current path before this produces output
//     if let Ok(lines) = read_lines(filename) {
//         // Consumes the iterator, returns an (Optional) String
//         for line in lines {
//             if let Ok(ip) = line {
//                 println!("{}", ip);
//             }
//         }
//     }
// }

// The output is wrapped in a Result to allow matching on errors
// Returns an Iterator to the Reader of the lines of the file.
// fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
// where
//     P: AsRef<Path>,
// {
//     let file = File::open(filename)?;
//     Ok(io::BufReader::new(file).lines())
// }
// use crate::command::traits::{Command};
// use command::Command;
