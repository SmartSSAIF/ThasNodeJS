# import zerorpc

# c = zerorpc.Client()
# c.connect("tcp://127.0.0.1:5005")
# print (c.pedido(['peteca1','peteca11']))
# import mysql.connector
# mydb = mysql.connector.connect(
#   host="18.228.197.162",
#   user="root",
#   passwd="petequinha",
#   database="thas"
# )
# mycursor = mydb.cursor()
# mycursor.execute("SELECT * FROM lugares")

# myresult = mycursor.fetchall()

# for x in myresult:
#   print(x)
# print(mydb)
import socket
import threading
from threading import Thread
import _thread
class Comunicacao(threading.Thread):
    def __init__(self):
        Thread.__init__(self)
        self.portaEnvio = 5020
        self.portaRecebe = 5015
        self.servidor = "127.0.0.1"
        #self.motor = Motor()
    def run(self):
        print("Thread iniciada")
        self.listener()
    def enviarMensagem(self,  mensagem):
        udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        udp.sendto(mensagem.encode(), (self.servidor, self.portaEnvio))

    def listener(self):
        print("Iniciou listener")
        host = ""
        udpListener = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        udpListener.bind((host, self.portaRecebe))
        while True:
            msg, cliente = udpListener.recvfrom(1024)
            print("Recebeu")
            print(msg.decode())
            # _thread.start_new(self.tratamentoMensagem, (msg,))
    # def tratamentoMensagem(self, mensagem):
    #     global sentido
    #     global liberado
    #     mensagem = mensagem.decode()
    #     print(mensagem)
    #     if(liberado):
    #         self.enviarMensagem("Liberado")
    #     if("Frente" in mensagem):
    #         self.motor.sentidoFrente = True
    #         self.motor.zerarValores()
    #     elif "Tras" in mensagem:
    #         self.motor.sentidoFrente = False
    #         self.motor.zerarValores()
    #     elif ("PWM" in mensagem):
    #         split = mensagem.split(" ")
    #         self.motor.alterarPWM(int(split[1]))
    #     elif("Ponto" in mensagem):
    #         _thread.start_new(self.enviarMensagem, tuple(self.servidor, ""))
    #     elif ("Instrucoes" in mensagem):

    #         try:
    #             mensagem = mensagem.replace("Instrucoes ", "")
    #             split = mensagem.split("/")
    #             print(split[0])
    #             for i in split:
    #                 if(len(i) <3):
    #                     break

    #                 print("i vale \t",i)
    #                 splitInstrucao = i.split(" ")
    #                 tagA = splitInstrucao[0]
    #                 tagB = splitInstrucao[1]
    #                 angulo = splitInstrucao[2]
    #                 peso = splitInstrucao[3]
    #                 prioridade = 1
    #                 instrucao = Instrucao(tagA, tagB, angulo, peso, prioridade)
    #                 semaforoInstrucoes.acquire()
    #                 instrucoes.append(instrucao)
    #                 semaforoInstrucoes.release()
    #         except:
    #             print("Erro linha 168 ", sys.exc_info()[0])

    #     # elif("Instrucoes" in mensagem):
    #     #     semaforoInstrucoes.acquire()
    #     #     try:
    #     #         mensagem = mensagem.decode().replace("Instrucoes ","")
    #     #         split = mensagem.split("/")
    #     #         for i in split:
    #     #             splitInstrucao = i.split(" ")
    #     #             tagA = splitInstrucao[0]
    #     #             tagB = splitInstrucao[1]
    #     #             angulo = splitInstrucao[2]
    #     #             peso = splitInstrucao[3]
    #     #             instrucao = Instrucao(tagA,tagB,angulo,peso,prioridade=1)
    #     #             instrucoes.append(instrucao)
    #     #         #     MUDAR ESTRUTURA DE INSTRUCAO !!!!!!!!!!!!
    #     #
    #     #
    #     #         ##parei aqui
    #     #     finally:
    #     #         semaforoInstrucoes.release()
    #     else:
    #         print("Mensagem inválida")
    # def leituraSerial(self):
    #     global ultimaTag
    #     global ultimaTensao
    #     cm = serial.Serial('/dev/ttyACM0', 9600)
    #     while True:
    #         msgSerial = cm.readline()
    #         msgSerial = msgSerial.decode()
    #         #print(msgSerial)
    #         if("RFID" in msgSerial):
    #             splt = msgSerial.split(" ")
    #             ultimaTag = splt[1]
    #             print("ULTIMA TAG \t\t\t\t"+splt[1])
    #         if("Monitor" in msgSerial):
    #             split = msgSerial.split(" ")
    #             ultimaTensao = int(split[1])
    #             r = Relatorio()
    #             r.gravar(split[1])
    #         self.enviarMensagem(msgSerial)


print("Comunicacao")
comunicacao = Comunicacao()
print("Vai comecar")
comunicacao.start()
print("Passou o start")

