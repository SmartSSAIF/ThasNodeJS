import pymysql
import datetime
import zerorpc
import pickle
from Model import *
import json
class DB:
    banco = None

    def __new__(cls, *args, **kwargs):
        if not cls.banco:
            cls.banco = super(DB, cls).__new__(cls, *args, **kwargs)
        return cls.banco

    def __init__(self):
        self.db = pymysql.connect(host="localhost", user="local",
                                  passwd="p3tecH4mbul4nt3#%&(#*", db="thas")


# class PedidoDAO():
#   def __init__(self):
#     self.db = DB().db
#   def findPedidosNaFila(self):
#     cur = self.db.cursor()
#     cur.execute('select * from pedido where statusPedido = 1 order by prioridade desc')
#     return cur.fetchall()
#   def find(self, id):
#     return PedidoProdutoDAO().findProdutosAndPedido(id)
#     # cur = self.db.cursor()
#     # cur.execute('select * from pedido where id=%s',[id])
#     # pedido =  cur.fetchone()
#     # produtos = PedidoProdutoDAO().findProdutosAndPedido(id)
#     # if len(produtos) > 0:
#     #   return Pedido(pedido[0],pedido[1],pedido[2],pedido[3],produtos[-1][3], produtos[-1][4])
#     # return Pedido(pedido[0],pedido[1],pedido[2],pedido[3],0,0) 
#   def buscaPedidosNaFila(self):
#     pedidosBD = self.findPedidosNaFila()
#     pedidos = []
#     for i in pedidosBD:
#       print(i)
#       produtos = PedidoProdutoDAO().findProdutosAndPedido(i[0])
#       pedido = Pedido(i[0],i[1],i[2],i[3],produtos[-1][3],produtos[-1][4])
#       pedidos.append()
#     return pedidos
#   def updateStatus(self, id, status):
#     try:

#       cur = self.db.cursor()
#       print('tentando')
#       cur.execute('UPDATE pedido SET statusPedido=%s WHERE id=%s',[status, id])
#       self.db.commit()
#       s = cur.fetchall()
#       print(s)
#       print('foi')
#     except Exception as e:
#       print(e)
# class PedidoProdutoDAO():
#   def __init__(self):
#     self.db = DB().db
#   def findProdutosAndPedido(self,idPedido):
#     cur = self.db.cursor()
#     cur.execute('select * from pedido where id=%s',[idPedido])## Duas vezes para pegar origem e destino
#     pedidoDB = cur.fetchone()
#     print(pedidoDB)
#     cur.execute('select * from pedidoproduto where idPedido = %s',[idPedido])
#     produtosDB = cur.fetchall()
#     print("tam ", len(produtosDB))
#     if len(produtosDB)>0:
#       pedido = Pedido(pedidoDB[0],pedidoDB[1],pedidoDB[2],pedidoDB[3],produtosDB[-1][3],produtosDB[-1][4])
#     else:
#       pedido = Pedido(pedidoDB[0],pedidoDB[1],pedidoDB[2],pedidoDB[3],-1,-1)
#     for i in produtosDB:
#       cur.execute('select * from produtos where id =%s',i[1])
#       produto = cur.fetchone()
#       pedido.produtos.append(Produto(produto[0],produto[1],produto[2],produto[3]))
#     return pedido

# class ProdutoDAO():
#   def __init__(self):
#     self.db = DB().db
 
#   def findProduto(self, id):
#     cur = self.db.cursor()
#     cur.execute('select * from produtos where id = %s',[id])
#     produto =  cur.fetchone()
#     print(produto)
#     return Produto(produto[0], produto[1], produto[2], produto[3])
# class CarroDAO():
#   def __init__(self):
#     self.db = DB().db
 
#   def findFree(self):
#     cur = self.db.cursor()
#     cur.execute('select * from carros where estado = %s',[1])
#     carro =  cur.fetchall()
#     carros = []
#     for i in carro:
#       carros.append(Carro(i[0], i[1], i[2], i[3]))
#     return carros
# class Pedido(object):
#   def __init__(self, id, data, statusPedido, prioridade, origem, destino):
#     self.id = id
#     self.data = data
#     self.statusPedido = statusPedido
#     self.prioridade = prioridade
#     self.origem = origem
#     self.destino = destino
#     self.produtos = []

# class Lugar(object):
#   def __init__(self, id, nome):
#     self.id=id
#     self.nome=nome
# class Carro(object):
#   def __init__(self, id, ip, estado, localizacaoAtual) :
#     self.id = id
#     self.ip = ip
#     self.estado = estado
#     self.localizacaoAtual = localizacaoAtual
# class Produto(object):
#   def __init__(self, id, nome, lugar, nomeLugar):
#     self.id = id
#     self.nome = nome
#     self.lugar = lugar
#     self.nomeLugar = nomeLugar



c = zerorpc.Client()
c.connect("tcp://127.0.0.1:5005")
##Busca fila de pedidos e converte para objeto pedido

while True:
  fila = PedidoDAO().findPedidosNaFila()
  filaPedido = []
  for i in fila:
    filaPedido.append(PedidoDAO().find(i['id']))
  
  # instrucaoAtual = filaPedido.pop(0)
  
  if len(filaPedido)>0:
    print("Pedido")
    pedido = filaPedido.pop(0)
    print(type(pedido))
    carros = CarroDAO().findFree()
    if len(carros) > 0:

      carro = carros[0] ##Logica para buscar o melhor carro disponivel
      # CarroDAO().updateStatus(carro.id,0)
      ob = c.pedido([LugarDAO().find(pedido.origem).nome,LugarDAO().find(pedido.destino).nome])
      instrucoes = pickle.loads(ob)
      # for instrucao in instrucoes:
      #   print(type(instrucao))
      #   print(json.dumps(instrucao))

      Comunicacao(carro, instrucoes).start()
      PedidoDAO().updateStatus(pedido.id,0)
      pedido.setInstrucoes(instrucoes)
  
  
  

