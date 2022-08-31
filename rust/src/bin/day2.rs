#![feature(array_windows)]
#![feature(array_from_fn)]
#![feature(slice_group_by)]

pub(crate) mod stdx;

fn main() {
		println!("Day 2 code here");

        let input = include_str!("input.day2.txt");

		let result = input
		  .lines()
		  .map(parse_line)
		  .fold(Point {x: 0, y: 0}, |mut acc, point| {

			acc.x += point.x;
			acc.y += point.y;
			return acc;

		});

		println!("{:?}", result);
}



#[derive(Debug)]
struct Point {
	x: i32,
	y: i32
}
 
fn parse_line(line: &str) -> Point {
  let (dir, amount) = line.split_once(" ").expect("must be string");
  let amount: i32 = str::parse::<i32>(amount).expect("second arg must be amount");
   
  if dir == "forward" {
	return Point {x: amount, y: 0}
  } else if dir == "up" {
	return Point {x: 0, y: -amount}
  }

  return Point {x: 0, y: amount};
}