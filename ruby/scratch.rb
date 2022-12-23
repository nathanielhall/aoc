#!/usr/bin/env ruby

# hsh = {one: "one", two: "two"}
# hsh.each_value {|x| puts "Value: #{x}"}

# 1.9.2 > [1,2,3,4].delete_if {|x| x > 10}
# 1.9.2 > [1,2,3,4].delete_if {|x| x > 10}

# 1.9.2 > [1,2,3,4].reject! {|x| x > 10}

# https://adventofcode.com/2020/day/6/input


class User
	attr_reader :name, :username
	attr_accessor :display_name
  
	def initialize(name, username)
	  @name = name
	  @username = username
	end
  
	def display_name
	  @name
	end
end

usr = User.new("John Smith", "jsmith")

puts usr.inspect
puts usr.display_name