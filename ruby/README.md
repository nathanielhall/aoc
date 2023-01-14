# Advent of Code in Ruby

Build the container
```
docker build -t aoc-ruby .
```

Run the container
```
docker run -it -v `pwd`:/app aoc-ruby bash
```