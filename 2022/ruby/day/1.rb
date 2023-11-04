#!/usr/bin/env ruby

elves = File.read("./1.txt").split("\n\n")
puts "There are #{elves.count} elves"

caloriesPerElf = elves.map{|elf| elf.split().map(&:to_i).sum }

puts caloriesPerElf.max

puts caloriesPerElf.sort[-3..-1].sum
