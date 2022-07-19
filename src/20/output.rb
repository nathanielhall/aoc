#!/usr/bin/env ruby

class Tile

	attr_accessor :top, :right, :bottom, :left

	def initialize() 

	end
end



def parse
	puts "Read File"
	file = File.open("./input.txt", "r")

	while !file.eof?
		line = file.gets
		puts line
		if line.match(/^\s*$/)
		  10.times{ 
			line = file.gets if !file.eof?
			title = Title.new
			title.top = file.gets if !file.eof?


			# Load 10 lines into multi-deminsional arrays, called Rows
			# Each row is an array of characters

			# top = row[0][0-9]
			# right = row[0-9][9]
			# bottom = row[9][0-9]
			# left = row[0][0-9]

			
			puts line
		   }
	    end
    end
end



parse