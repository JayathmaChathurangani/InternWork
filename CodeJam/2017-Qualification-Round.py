objectNumber = -1

class Node:
    global objectNumber
    objectNumber = objectNumber + 1 
    def __init__(self,booleanList):
        
        self.number = objectNumber 
        self.booleanList = booleanList

T = int(input())
nodeArray = []
for i in range(T):
    inputLine = str(input())
    inputLine = inputLine.strip()
    inputLineArray = inputLine.split(" ")
    S_charArray = list(inputLineArray[0])
    K = int(inputLineArray[1])
    
    S_booleanArray = []
    for s in S_charArray:
        
        if( s == '+'):
            S_booleanArray.append(True)
        elif ( s == '-'):
            S_booleanArray.append(False)
    node = Node(S_booleanArray)
    nodeArray.append(node)
print(id(nodeArray[0]),id(nodeArray[1]))


