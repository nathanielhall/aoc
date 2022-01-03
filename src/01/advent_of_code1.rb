#!/usr/bin/env ruby
#
#  ######################################
#  Two Sum Problem
#  ######################################
#  
def find_pairs(arr, s)
  pairs = []
  hash_table = {}

  arr.each_with_index do |value, i|
    sum_minus_number = s - value

    if hash_table[sum_minus_number]
      puts "#{value} + #{sum_minus_number} equals #{s})"
    end

    hash_table[value] = value
  end
end


  find_pairs([1,2,3,4,5], 9)
