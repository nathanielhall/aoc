use crate::stdx::IterExt;
pub use crate::command::Command;

pub struct Day1;
impl Command for Day1 {
    fn get_day(&self) -> i32 {
        1
    }
    fn execute(&self) {
        let input = include_str!("input.day1.test.txt");
        let count = parse(input);

        println!("Count: {}", count);

        // let slice = [0, 1, 2, 3];
        // let iter = slice.array_windows::<2>();
        // for i in iter {
        //     println!("Iter: {:?}", i)
        // }
    }
}

// https://doc.rust-lang.org/std/slice/struct.ArrayWindows.html
fn parse(input: &str) -> usize {
    input
        .lines()
         .map(|line| line.parse::<u16>().unwrap())
        .array_windows()
        .filter(|[n1, n2]| n2 > n1)
        .count()
}