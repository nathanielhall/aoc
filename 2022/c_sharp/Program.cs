namespace AdventOfCode
{
	class Program
    {
		static void Main(string[] args)
		{
			string input = File.ReadAllText(@"./example.txt");

			var result = from elf in input.Split("\n\n") 
				let calories = elf.Split('\n').Select(int.Parse).Sum()
				orderby calories descending
				select calories;

				Console.WriteLine(result.First());
		}
	}
}



