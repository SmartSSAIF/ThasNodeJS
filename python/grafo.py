import socket
import _thread
import time
import json
import zerorpc
import requests
import pickle
# from threading import Thread
from Model import *
import threading
import numpy as np

class Adjacente(object):
    def __init__(self):
        pass
    def __init__(self, node, peso,angulo, distancia):
        self.node = node
        self.peso = peso
        self.distancia = distancia
    def toJson(self):
        return {'node': self.node.toJson(),
                        'peso': self.peso,
                        'distancia': self.distancia}
class No(object):
    
    def __init__(self, lugar):
        self.lugar = lugar
        self.visitado = False
        self.indice = lugar.indice
        self.adjacentes = []
        self.pai = None
        self.rfid = lugar.rfid
  
    def toJson(self):
        return {
            'lugar': self.lugar.nome,
            'indice': self.indice,
            'rfid': self.rfid.codigo
        }
    def setPai(self,pai):
        self.pai = pai

    def addAdjacente(self, adjacente):
        self.adjacentes.append(adjacente)

class Grafo(object):
    # def __init__(self):
    #     self.vertices = []
    def __init__(self, vertices):
        self.vertices = vertices
        
    def addVertices(self, vertice):
            self.vertices.append(vertice)
    def printAdjacentes(self):
        print(len(self.adjacentes))
        for i in self.adjacentes:
            i = i.node
            print(i.indice," ,", end="", flush=True)
        print()
    def iniciaVertices(self):
        for no in self.vertices:
            self.vertices[no].visitado = False
    def buscaCaminhoPorId(self,ids):
        
        print('Chegou ',ids[0],'\t ',ids[1])
        resposta = []
        no = self.buscaCaminho(self.vertices[ids[0]], self.vertices[ids[1]])
        caminho = self.caminhoFinal(no)
        print('Tipo ', type(no))
        nos = (caminho.split(','))
        print(nos)
        resposta = {}
        resposta[nos[0]] = (self.vertices[int(nos[0])])
        ultimo = nos[0]
        i = 1 
        while i < len(nos):
            print('Tipo ',type(resposta[ultimo]))
            print('Ultim ', ultimo)
            print('Ultimo do vetor ', nos[i])
            for j in self.vertices[int(ultimo)].adjacentes:
                if  j.node.indice == int(nos[i]):
                    resposta[nos[i]] = (j)
                    ultimo  = nos[i]


       
            i+=1
        print(len(resposta))
        respostaFinal  = []
        for i in resposta:
            respostaFinal.append(resposta[i].toJson())
        print(respostaFinal)


            
        
        
        return respostaFinal
    def buscaCaminho(self, de, para):
        print('de ', de.indice)
        print('para ', type(para))
        origem = self.vertices[de.indice]
        origem.visitado = True
        origem.setPai(None)
        destino = self.vertices[para.indice]
        vetor = []
        j=0
        while True:
            for adjacente in origem.adjacentes:
                if not(adjacente.node.visitado):
                    adjacente.node.visitado = True
                    adjacente.node.setPai(origem)
                    vetor.append(adjacente)
            aux = vetor.pop()
            if aux.node.indice == destino.indice:
                self.iniciaVertices()
                del(vetor)
                return aux
            if isinstance(aux,Adjacente):
                origem = aux.node 
            else:
                origem = aux
            j+=1

    def geraCaminhos(self):
        caminhos = {}
        for de in self.vertices:
            for para in self.vertices:
                key = str(de.indice)+','+str(para.indice)
                caminho = self.buscaCaminho(de,para)
                caminhos[key]=self.caminhoFinal(caminho)
        return caminhos
    def caminhoFinal(self, vertice):
        if isinstance(vertice, No):
            if vertice.pai == None:
                return vertice.indice
            return str(self.caminhoFinal(vertice.pai))+","+str(vertice.indice)
        if isinstance(vertice, Adjacente):
            if vertice.node.pai == None:
                return vertice.node.indice
            return str(self.caminhoFinal(vertice.node.pai))+","+str(vertice.node.indice)        
        # if isinstance(vertice, No):
        #     if vertice.pai == None:
        #         return vertice.toJson()
        #     return str(self.caminhoFinal(vertice.pai))+"-NEW-"+str(vertice.toJson())
        # if isinstance(vertice, Adjacente):
        #     if vertice.node.pai == None:
        #         return vertice.toJson()
        #     return str(self.caminhoFinal(vertice.node.pai))+"-NEW-"+str(vertice.toJson())
        
    # def busca(self, lugarA, lugarB):
    #     if lugarA != lugarB:
            

vertices = {}
lugares =  LugarDAO().readAll()
for vertice in lugares:
 
    if vertice['id'] <5: ##
        vertices[vertice['id']] = No(Lugar(vertice['nome'],vertice['rfid'],vertice['id']))

# print(vertices)
arestas = ArestaDAO().readAll()
for aresta in arestas:
    adj = Adjacente(vertices[aresta['lugar2']], aresta['peso'], aresta['angulo'], aresta['distancia'])
    vertices[aresta['lugar1']].addAdjacente(adj)

    
g = Grafo(vertices)
print(g.vertices.keys())
print('Quem ',(g.vertices[1]))
x = g.buscaCaminho(g.vertices[1], g.vertices[2])
print('Non ', type(x.node))
print(g.caminhoFinal(x.node))
g.iniciaVertices()

x = g.buscaCaminho(g.vertices[2], g.vertices[1])
print('Non ', type(x.node))
print(g.caminhoFinal(x.node))
x = g.buscaCaminho(g.vertices[3], g.vertices[1])
print('Non ', type(x.node))
print(g.caminhoFinal(x.node))
x = g.buscaCaminho(g.vertices[1], g.vertices[3])
print('Non ', type(x.node))
print(g.caminhoFinal(x.node))



s = zerorpc.Server(g)
s.bind("tcp://0.0.0.0:5005")
s.run()
print('Dps')