import socket
import _thread
import time
import json
import zerorpc

# from threading import Thread

import threading


pontoAtual = "A"

posicao = None
pontos = []
pontos.append(False)
pontos.append(False)
pontos.append(False)
pontos.append(False)

hashLugares = {}
hashRfid = {}

pedidos =[]
semaforoPedidos = threading.Semaphore()

class Graph(object):
    def __init__(self):
        self.nos = []

    def addNo(self, no):
        self.nos.append(no)


    def printGrafo(self):
        for i in self.nos:
            i.printAdjacentes()

class Node(object):

    def __init__(self, lugar):
        self.lugar = lugar
        self.visitado = False
        self.indice = lugar.indice
        self.adjacentes = []
        self.pai = None
        self.rfid = lugar.rfid

    def setPai(self,pai):
        self.pai = pai

    def addAdjacente(self, no):

        self.adjacentes.append(no)
        no.adj(self)

    def adj(self, no):
        self.adjacentes.append(no)




    def printAdjacentes(self):
        print(len(self.adjacentes))
        for i in self.adjacentes:
            print(i.indice," ,", end="", flush=True)
        print()
    def setPai(self, no):
        self.pai = no

class Aresta(object):
    def __init__(self, noA, noB, angulo=0, peso=1):
        self.noA = noA
        self.noB = noB
        self.peso = peso
        self.angulo = angulo # 0 reto 1 costas ### 2 direito 3 esquerdo

    def toString(self):
        return "No " +str(self.noA.indice)+":"+str(self.noA.rfid.codigo)+" No "+str(self.noB.indice)+":"+str(self.noB.rfid.codigo)+" \tAngulo "+str(self.angulo)+"º \tPeso "+str(self.peso)




class Rfid(object):
    def __init__(self, codigo):
        self.codigo = codigo
class Lugar():
    def __init__(self,nome, rfid, id):
        self.indice = id
        self.nome = nome
        self.rfid =  Rfid(rfid)
        self.itens = []



class Item():
    def __init__(self, nome,quantidade):
        self.nome = nome
        self.quantidade = quantidade
class Pedido():
    def __init__(self,de,para,itens,dados):
        self.de = de
        self.para = para
        self.itens = itens
        self.dados = dados




for i in range(18):
    nome = str("peteca"+str(i))
    rfid = str("rfid"+str(i))
    l = Lugar(nome,rfid,i)
    # lugares.append(l)
    n = Node(l)
    hashLugares[nome] = n ##Trocar o i para RFID ou nao?
    hashRfid[rfid] = n

class Logica(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self.portaEnvio = 5015
        self.portaRecebe = 5020
        self.liberado = False
        self.raspberry = "192.168.0.106"
        self.comunicacao = Comunicacao(hashLugares)

    def run(self):
        _thread.start_new(self.listener, tuple())
        global pedidos

        while 1:
            if(len(pedidos)>0 and self.liberado == True):
                semaforoPedidos.acquire()
                try:
                    pedido = pedidos.pop()
                    # list = []
                    # list.append(Item('petecA',1))
                    # pedido = Pedido(hashLugares['peteca17'],hashLugares['peteca3'],list,"")


                    split1 = (self.comunicacao.caminhoFinal(self.comunicacao.buscaCaminho(hashLugares[pedido.de.lugar.nome],hashLugares[pedido.para.lugar.nome],graph)))
                    print(split1)
                    split1 = split1.split(',')
                    instrucoes = ""
                    for i in range(len(split1)-1):
                        key = split1[i] + ','+split1[i+1]
                        instrucoes = instrucoes + (listaArestas[key].toString())+"-"
                    self.enviaPedido(self.raspberry,instrucoes)
                finally:
                    self.liberado = False
                    semaforoPedidos.release()

            return


                # Acha De na hash
                # Acha Para na hash
                # Busca itens no para
                # Busca quantidade no item
                # Busca rota
                # Envia para Raspberry
    def enviaPedido(self, cliente, mensagem):
        udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        print("Cliente ", cliente)
        udp.sendto(mensagem.encode(), (cliente, self.portaEnvio))
        print("Mensagem enviada")
        udp.close()
    def listener(self):
        print("Listener inicializado")
        host = ""
        udpListener = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        udpListener.bind((host, self.portaRecebe))
        while True:
            msg, cliente = udpListener.recvfrom(1024)
            msg = msg.decode()
            print(msg, cliente)
            if("Finalizado" in msg.decode()):
                self.liberado = True



# comunicacao = Comunicacao()
# comunicacao.start()
class Comunicacao(object):
    def __init__(self):
        self.x = 0

    def setFalse(self,grafo):
        for i in grafo.nos:
            i.visitado = False
    def buscaCaminho(self,de, para, grafo):
        origem = grafo.nos[grafo.nos.index(de)]
        origem.visitado = True
        origem.setPai(None)
        destino =  grafo.nos[grafo.nos.index(para)]
        vetor = []
        j = 0
        while True:
            for i in origem.adjacentes:
                if(not(i.visitado)):
                    i.visitado = True
                    i.setPai(origem)

                    vetor.append(i)

            aux = vetor.pop()

            if(aux.indice == destino.indice):
                self.setFalse(grafo)
                del(vetor)
                return aux

            origem = aux
            j+=1

    def gerarCaminhos(self, grafo):
        caminhos = {}
        for de in grafo.nos:
            for para in grafo.nos:
                if(de != para):
                    key = str(de.indice)+","+str(para.indice)
                    caminho = buscaCaminho(de, para, grafo)
                    #print(caminhoFinal(caminho))
                    caminhos[key] = self.caminhoFinal(caminho)
        return caminhos


    def caminhoFinal(self,no):
        if(no.pai == None):
            return no.indice

        return str(self.caminhoFinal(no.pai))+","+str(no.indice)

    def pedido(self,lugares):
        split1 = (self.caminhoFinal(self.buscaCaminho(hashLugares[lugares[0]],hashLugares[lugares[1]],graph)))
        print("split")
        print(split1)
        split1 = split1.split(',')
        instrucoes = ""
        saida = []
        for i in range(len(split1)-1):
            key = split1[i] + ','+split1[i+1]
            print(listaArestas[key].toString())
            saida.append(listaArestas[key].toString())
        return saida
        

    def addAresta(self,noa,nob,angulo=0,peso=1):
        nome = str(noa.indice)+','+str(nob.indice)
        split = nome.split(",")
        nome2 = split[1] + "," + split[0]
        listaArestas[nome] = Aresta(noa,nob,angulo,peso)
        listaArestas[nome2] = Aresta(nob,noa,-1*angulo,-1*peso)

graph = Graph()
print(hashLugares.keys())
##Grafo
hashLugares[("peteca"+str(1))].addAdjacente(hashLugares[("peteca"+str(16))])
hashLugares[("peteca"+str(16))].addAdjacente(hashLugares[("peteca"+str(17))])
hashLugares[("peteca"+str(0))].addAdjacente(hashLugares[("peteca"+str(10))])
hashLugares[("peteca"+str(1))].addAdjacente(hashLugares[("peteca"+str(2))])
hashLugares[("peteca"+str(3))].addAdjacente(hashLugares[("peteca"+str(2))])
hashLugares[("peteca"+str(3))].addAdjacente(hashLugares[("peteca"+str(5))])
hashLugares[("peteca"+str(4))].addAdjacente(hashLugares[("peteca"+str(5))])
hashLugares[("peteca"+str(2))].addAdjacente(hashLugares[("peteca"+str(4))])
hashLugares[("peteca"+str(12))].addAdjacente(hashLugares[("peteca"+str(3))])
hashLugares[("peteca"+str(4))].addAdjacente(hashLugares[("peteca"+str(13))])
hashLugares[("peteca"+str(6))].addAdjacente(hashLugares[("peteca"+str(5))])
hashLugares[("peteca"+str(6))].addAdjacente(hashLugares[("peteca"+str(7))])
hashLugares[("peteca"+str(9))].addAdjacente(hashLugares[("peteca"+str(7))])
hashLugares[("peteca"+str(9))].addAdjacente(hashLugares[("peteca"+str(8))])
hashLugares[("peteca"+str(6))].addAdjacente(hashLugares[("peteca"+str(8))])
hashLugares[("peteca"+str(8))].addAdjacente(hashLugares[("peteca"+str(15))])
hashLugares[("peteca"+str(14))].addAdjacente(hashLugares[("peteca"+str(7))])
hashLugares[("peteca"+str(9))].addAdjacente(hashLugares[("peteca"+str(10))])
hashLugares[("peteca"+str(11))].addAdjacente(hashLugares[("peteca"+str(10))])





listaArestas = {}
for i in hashLugares:
    graph.addNo(hashLugares[i])
com = Comunicacao()



com.addAresta(hashLugares[("peteca"+str(16))],hashLugares[("peteca"+str(17))])
com.addAresta(hashLugares[("peteca"+str(1))],hashLugares[("peteca"+str(16))])
com.addAresta(hashLugares[("peteca"+str(0))],hashLugares[("peteca"+str(10))])
com.addAresta(hashLugares[("peteca"+str(1))],hashLugares[("peteca"+str(2))])
com.addAresta(hashLugares[("peteca"+str(3))],hashLugares[("peteca"+str(2))],90,2)
com.addAresta(hashLugares[("peteca"+str(3))],hashLugares[("peteca"+str(5))],-90,2)
com.addAresta(hashLugares[("peteca"+str(4))],hashLugares[("peteca"+str(5))],90,2)
com.addAresta(hashLugares[("peteca"+str(2))],hashLugares[("peteca"+str(4))],90,2)
com.addAresta(hashLugares[("peteca"+str(12))],hashLugares[("peteca"+str(3))])
com.addAresta(hashLugares[("peteca"+str(4))],hashLugares[("peteca"+str(13))])
com.addAresta(hashLugares[("peteca"+str(6))],hashLugares[("peteca"+str(5))])
com.addAresta(hashLugares[("peteca"+str(6))],hashLugares[("peteca"+str(7))],-90,2)
com.addAresta(hashLugares[("peteca"+str(9))],hashLugares[("peteca"+str(7))],90,2)
com.addAresta(hashLugares[("peteca"+str(9))],hashLugares[("peteca"+str(8))],-90,2)
com.addAresta(hashLugares[("peteca"+str(6))],hashLugares[("peteca"+str(8))],90,2)
com.addAresta(hashLugares[("peteca"+str(8))],hashLugares[("peteca"+str(15))])
com.addAresta(hashLugares[("peteca"+str(14))],hashLugares[("peteca"+str(7))])
com.addAresta(hashLugares[("peteca"+str(9))],hashLugares[("peteca"+str(10))])
com.addAresta(hashLugares[("peteca"+str(11))],hashLugares[("peteca"+str(10))])


##Teste
com.pedido(['peteca1','peteca11'])


# print(com.buscaCaminho(hashLugares['peteca1'],hashLugares['peteca11'],graph))
# split1 = (com.caminhoFinal(com.buscaCaminho(hashLugares['peteca1'],hashLugares['peteca11'],graph)))
# print("split")
# print(split1)
# split1 = split1.split(',')
# instrucoes = ""
# for i in range(len(split1)-1):
#     key = split1[i] + ','+split1[i+1]
#     print(listaArestas[key].toString())





print("Rfid "+hashRfid['rfid6'].lugar.nome)
# logica = Logica()
# logica.start()

s = zerorpc.Server(com)
s.bind("tcp://0.0.0.0:5005")
s.run()
# caminhos = gerarCaminhos(graph)
# print("Total "+str(len(caminhos)))
# print(caminhos['1,11'])
# resposta = caminhos['1,11']
# print("Resposta ",resposta)
# pontos = resposta.split(",")


# print(listaArestas.keys())
