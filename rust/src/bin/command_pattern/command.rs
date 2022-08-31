pub trait Command  {
	fn get_day(&self) -> i32;
	fn execute(&self);
}