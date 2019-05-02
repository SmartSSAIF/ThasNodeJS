import pymysql
import requests
from threading import Thread
import json
class DB:
    banco = None

    def __new__(cls, *args, **kwargs):
        if not cls.banco:
            cls.banco = super(DB, cls).__new__(cls, *args, **kwargs)
        return cls.banco

    def __init__(self):
        self.db = pymysql.connect(host="afterthat.com.br", user="awsbanco1",
                                  passwd="petequinha", db="thas")
class LugarDAO():
  def __init__(self):
    self.db = DB().db
  def read(self):
    cur = self.db.cursor()
    cur.execute('select * from lugares where id > 0')
    lugares = []
    lugaresBD = curToObj(cur)
    lugares = []
    for i in lugaresBD:
      lugares.append(Lugar(i['nome'],i['rfid'],i['id']))
    return lugares
  def find(self, id):
    cur = self.db.cursor()
    cur.execute('select * from lugares where id =%s',[id])
    lugar =  curToObj(cur)
    if len(lugar)>0:
      lugar = lugar[0]
    if lugar:
      return Lugar(lugar['nome'],lugar['rfid'],lugar['id'])
class ArestaDAO():
  def __init__(self):
    self.db = DB().db
  def read(self):
    cur = self.db.cursor()
    cur.execute('select * from aresta')
    arestasBD = curToObj(cur)
    arestas = []
    for aresta in arestasBD:
      arestas.append(Aresta(Node(LugarDAO().find(aresta['lugar1'])),Node(LugarDAO().find(aresta['lugar2'])), aresta['angulo'],aresta['peso']))

    return arestas
  def find(self, lugar):
    cur = self.db.cursor()
    cur.execute('select * from aresta where lugar1 = %s or lugar2 = %s',[lugar,lugar])
    return curToObj(cur)
  
class PedidoDAO():
  def __init__(self):
    self.db = DB().db
  def findPedidosNaFila(self):
    cur = self.db.cursor()
    cur.execute('select * from pedido where statusPedido = 1 order by prioridade desc')
    return curToObj(cur)
  def find(self, id):

    return PedidoProdutoDAO().findProdutosAndPedido(id)
    # cur = self.db.cursor()
    # cur.execute('select * from pedido where id=%s',[id])
    # pedido =  cur.fetchone()
    # produtos = PedidoProdutoDAO().findProdutosAndPedido(id)
    # if len(produtos) > 0:
    #   return Pedido(pedido[0],pedido[1],pedido[2],pedido[3],produtos[-1][3], produtos[-1][4])
    # return Pedido(pedido[0],pedido[1],pedido[2],pedido[3],0,0) 
  def buscaPedidosNaFila(self):
    pedidosBD = self.findPedidosNaFila()
    pedidos = []
    for i in pedidosBD:
      produtos = PedidoProdutoDAO().findProdutosAndPedido(i[0])
      pedido = Pedido2(i[0],i[1],i[2],i[3],produtos[-1][3],produtos[-1][4])
      pedidos.append()
    return pedidos
  def updateStatus(self, id, status):
    try:

      cur = self.db.cursor()
      cur.execute('UPDATE pedido SET statusPedido=%s WHERE id=%s',[status, id])
      self.db.commit()
      cur.fetchone()
    except Exception as e:
      print(e)
  
class PedidoProdutoDAO():
  def __init__(self):
    self.db = DB().db
  def findProdutosAndPedido(self,idPedido):
    cur = self.db.cursor()
    cur.execute('select * from pedido where id=%s',[idPedido])## Duas vezes para pegar origem e destino
    pedidoDB = curToObj(cur)[0]
    cur.execute('select * from pedidoproduto where idPedido = %s',[idPedido])
    produtosDB = curToObj(cur)
      # id, data, statusPedido, prioridade, origem, destino
    pedido = Pedido2(pedidoDB['id'],pedidoDB['data'],pedidoDB['statusPedido'],pedidoDB['prioridade'],produtosDB[0]['origem'],produtosDB[0]['destino'], pedidoDB['observacoes'])
    for i in produtosDB:
      cur.execute('select * from produtos where id =%s',[i['idProduto']])
      produto = curToObj(cur)[0]
      #  id, nome, lugar, nomeLugar
      pedido.produtos.append(Produto(produto['id'],produto['nome'],produto['lugar'],produto['nomeLugar']))
    
    return pedido
def curToObj( cur):
    row_headers = [x[0] for x in cur.description]
    rv = cur.fetchall()
    json_data = []
    for result in rv:
      json_data.append(dict(zip(row_headers, result)))
    return (json_data)
class ProdutoDAO():
  def __init__(self):
    self.db = DB().db
 
  def findProduto(self, id):
    cur = self.db.cursor()
    cur.execute('select * from produtos where id = %s',[id])
    produto =  curToObj(cur)
    #  id, nome, lugar, nomeLugar
    return Produto(produto['id'], produto['nome'], produto['lugar'], produto['nomeLugar'])
class CarroDAO():
  def __init__(self):
    self.db = DB().db
 
  def findFree(self):
    cur = self.db.cursor()
    cur.execute('select * from carros where estado = %s',[1])
    carro= curToObj(cur)
    carros = []
    for i in carro:
      carros.append(Carro(i['id'], i['ip'], i['estado'], i['localizacaoAtual']))
    return carros
  def updateStatus(self, id, estado):
    try:
      cur = self.db.cursor()
      cur.execute('UPDATE carros SET estado=%s WHERE id=%s',[estado, id])
      self.db.commit()
      s = cur.fetchall()
    except Exception as e:
      print(e)
class Pedido2(object):
  def __init__(self, id, data, statusPedido, prioridade, origem, destino,observacoes):
    self.id = id
    self.data = data
    self.statusPedido = statusPedido
    self.prioridade = prioridade
    self.origem = origem
    self.destino = destino
    self.observacoes = observacoes
    self.produtos = []
    self.instrucoes = None
  def setInstrucoes(self, instrucoes):
    self.instrucoes = instrucoes
  def toString(self):
    return 'Origem: '+str(self.origem)+'\nDestino: '+str(self.destino)+'\nId: '+str(self.id)
  def toJson(self):
    r = {
        'id':self.id,
        'prioridade':self.prioridade,
        'origem':self.origem,
        'destino':self.destino,
        'observacoes': self.observacoes
      }
    return r

# class Lugar(object):
#   def __init__(self, id, nome):
#     self.id=id
#     self.nome=nome
class Carro(object):
  def __init__(self, id, ip, estado, localizacaoAtual) :
    self.id = id
    self.ip = ip
    self.estado = estado
    self.localizacaoAtual = localizacaoAtual
class Produto(object):
  def __init__(self, id, nome, lugar, nomeLugar):
    self.id = id
    self.nome = nome
    self.lugar = lugar
    self.nomeLugar = nomeLugar


class Instrucao():
    def  __init__(self, tagA, tagB, angulo, peso, prioridade = 1, no=1):
        self.no = no
        self.tagA = tagA
        self.tagB = tagB
        self.angulo = angulo
        self.peso = peso
        self.prioridade = prioridade


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
    def toJson(self):
      r = {
        'origem':self.noA.nome,
        'destino':self.noB.nome,
        'peso':self.peso,
        'angulo':self.angulo
      }
      return r
    def toString(self):
        return "No " +str(self.noA.indice)+":"+str(self.noA.rfid.codigo)+" No "+str(self.noB.indice)+":"+str(self.noB.rfid.codigo)+" \tAngulo "+str(self.angulo)+"º \tPeso "+str(self.peso)




class Rfid(object):
    def __init__(self, codigo):
        self.codigo = codigo
class Lugar(object):
    def __init__(self,nome, rfid, id):
        self.indice = id
        self.nome = nome
        self.rfid =  Rfid(rfid)
        self.itens = []



class Item():
    def __init__(self, id,nome,quantidade):
      self.id = id
      self.nome = nome
      self.quantidade = quantidade
class Pedido():
    def __init__(self,de,para,itens,dados):
        self.de = de
        self.para = para
        self.itens = itens
        self.dados = dados
class Comunicacao(Thread):
  def __init__(self, carro, instrucoes, pedido):
    Thread.__init__(self)
    self.carro = carro
    self.instrucoes = instrucoes
    self.pedido = pedido
  def run(self):
    for i in self.instrucoes:
      self.enviaInstrucoes(self.carro.ip, i.toJson(), self.pedido.toJson())

  def enviaInstrucoes(self, carro, instrucao,pedido):
    print("Vai enviar")
    print(type(pedido))
    a = {'carro':carro,'inst':(json.dumps(instrucao)), 'obs': (json.dumps(pedido))}
    print((a),'=========================')
    r = requests.post("http://localhost:3001/teste", data=json.loads(json.dumps(a)))
    print(r.status_code, r.reason)
    print(r.text[:300] + '...')