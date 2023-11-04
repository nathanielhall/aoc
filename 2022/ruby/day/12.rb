# require 'rubygems'
require 'algorithms'
include Containers

class Challenge
	def initialize() 
	end
	def execute()
		grid = File.read("./12.txt").split("\n").map{|x| x.split("")}

		start_point = [0, 0]
		end_point = [0, 0]

		grid.each_with_index do |row, i|
			row.each_with_index do |char, j|
				if char == "S"
					start_point = [i, j]
				elsif char == "E"
					end_point = [i, j]
				end
			end
		end

		queue = PriorityQueue.new
		queue.push({ steps: 0, point: end_point }, 1)

		visited = Array.new(grid.length) {Array.new(grid[0].length, false)}
		# puts visited.size
		# puts visited[0].size

		while queue.empty? != true
			item = queue.pop()

			x, y = item[:point]

			if visited[x][y]
		   		next
			end

			visited[x][y] = true

			if height(grid[x][y]) == 0
				steps = item[:steps]
				break
			end

			neighbor([x, y], grid).each do |n|
				queue.push({ steps: item[:steps] + 1, point: n })
			end
		end

		return steps
	end


	def neighbor(point, grid)
		x, y = point
		n = grid.length
		m = grid[0].length

		available = []

		[[1, 0], [-1, 0], [0, 1], [0, -1]].each do |dx, dy|
			xx = x + dx
			yy = y + dy
			is_outside = (xx < 0 || xx >= n) || (yy < 0 || yy >= m)

			# if height(grid[xx][yy]) <= height(grid[x][y]) + 1 # Part 1
			if !is_outside && height(grid[xx][yy]) >= height(grid[x][y]) - 1
				available << [xx, yy]
			end
		end

		return available
	end
  
	def height(char)
		if char == "S"
			return 0
		elsif char == "E"
			return 25
		end
		index = "abcdefghijklmnopqrstuvwxyz".split("").find_index { |x| x == char }
		return index
	end
end


solution = Challenge.new
solution.execute()

## ------------------------------------------------------------------------------


# HELLO THERE
