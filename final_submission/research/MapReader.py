import configparser
import json
import math

class MapReader:

    def __init__(self, filePath:str):
        """
        :param filePath: path of a config file
        """
        self.dictV, self.listEdge, self.listLotP = self.readFile(filePath)

    def distance(self, source, target):
        d = math.sqrt(math.pow((source[0]-target[0]), 2) + math.pow((source[1]-target[1]), 2))
        return d


    def readFile(self, filePath:str):
        parser = configparser.ConfigParser()
        parser.read(filePath, 'UTF-8')
        vertices = json.loads(parser.get('settings', 'vertices'))
        edges = json.loads(parser.get('settings', 'edges'))
        lotPoints = json.loads(parser.get('settings', 'lotPoints'))

        # Create a dictionary between integer number and co-ordinates
        dictV={}
        listLotP = []
        i = 1
        for v in vertices:
            dictV[i] = v
            if (v in lotPoints):
                listLotP.append(i)
            i += 1

        # Create a list of pair of integer vertices for the edges
        listEdge = []
        for e in edges:
            source = e[0]
            target = e[1]
            s = list(dictV.keys())[list(dictV.values()).index(source)]
            t = list(dictV.keys())[list(dictV.values()).index(target)]
            d = self.distance(source, target)
            listEdge.append((s,t,d))
        return dictV, listEdge, listLotP



