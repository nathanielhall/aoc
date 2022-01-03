#!/usr/bin/env python

# #############################
# Two Sum Problem
# #############################

def findPairs(arr, s):
    pairs = []
    hashTable = {}

    for i in range(len(arr)):
        sumMinusNumber = s - arr[i]

        if sumMinusNumber in hashTable:
            print(arr[i], " + ", sumMinusNumber, " equals ", s)

        hashTable[arr[i]] = arr[i]


findPairs([2,3,4,5], 9)
