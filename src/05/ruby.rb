#!/usr/bin/env ruby

def get_results
	file = File.open("./input.txt")
	file_data = file.readlines

	results = []
	file_data.each do |line|
		row_binary = line[0..6]
		row_binary = row_binary.gsub("F", "0")
		row_binary = row_binary.gsub("B", "1")

		col_binary = line[7..-2]
		col_binary = col_binary.gsub("L", "0")
		col_binary = col_binary.gsub("R", "1")

		seatId = row_binary.to_i(base=2) * 8 + col_binary.to_i(base=2)
		results.push(seatId)
	end

	total = results.max
	puts total
end

get_results