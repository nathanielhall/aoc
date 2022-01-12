pub use crate::command::Command;

pub struct Day2;
impl Command for Day2 {
	fn get_day(&self) -> i32 {
		2
	}
	fn execute(&self) {
		println!("Day 2 code here");
	}
}