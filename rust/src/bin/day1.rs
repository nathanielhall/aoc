#![feature(array_windows)]
#![feature(array_from_fn)]
#![feature(slice_group_by)]

pub(crate) mod stdx;

use crate::stdx::IterExt;

fn main() {
    let input = include_str!("input.day1.txt");

    let count = part1(&input);
    println!("Part 1: {:?}", count);

    let count = part2(&input);
    println!("Part 2: {:?}", count)
}

// https://doc.rust-lang.org/std/slice/struct.ArrayWindows.html
fn part1(input: &str) -> usize {
    input
        .lines()
        .map(|line| line.parse::<u16>().unwrap())
        .array_windows()
        .filter(|[n1, n2]| n2 > n1)
        .count()
}

fn part2(input: &str) -> usize {
    input
        .lines()
        .map(|line| line.parse::<u16>().unwrap())
        .array_windows::<3>()
        .map(|[n1, n2, n3]| n1 + n2 + n3)
        .array_windows::<2>()
        .filter(|[n1, n2]| n2 > n1)
        .count()
}
