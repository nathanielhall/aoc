use std::env;
use std::fs;
use std::process;
use std::error::Error;  

fn main() {
    let args: Vec<String> = env::args().collect();

    let config = Config::new(&args).unwrap_or_else(|err: &str| {
        println!("Problem parsing arguments: {}", err);
        process::exit(1);
    });

    println!("Searching for {}", config.query);
    println!("Filename {}", config.filename);

    if let Err(e) = run(config) {
        println!("Application error: {e}");
        process::exit(1);
    }
}

fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents: String =
        fs::read_to_string(config.filename).expect("Something went wrong reading the file");
    println!("Content: \n {}", contents);

    Ok(())
}

struct Config {
    query: String,
    filename: String,
}

impl Config {
    fn new(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 2 {
            return Err("Not enough args");
        }
        let query = args[1].clone();
        let filename = args[2].clone();

        Ok(Config { query, filename })
    }
}
