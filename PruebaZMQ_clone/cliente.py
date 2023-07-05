import cv2
import zmq
import base64
import threading
#-----Setup---------#
direccionGral = "tcp://192.168.0.23:"
dir_host = "tcp://*:"
puerto= "5005"
puerto2 = "5555"
puerto3 = "5556"

connect_pub=dir_host+puerto2
#------------------#
#Envia el stream usando ZMQ 
def video_stream():
    context = zmq.Context()
    socket = context.socket(zmq.PUB)
    socket.bind(connect_pub)

    camera = cv2.VideoCapture(0)
    camera.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

    while True:
        ret, frame = camera.read()
        if not ret:
            break

        # Codificar el fotograma en formato JPEG
        _, encoded_frame = cv2.imencode('.jpg', frame)
        frame_data = base64.b64encode(encoded_frame)

        # Enviar el fotograma al servidor
        socket.send(frame_data)

    camera.release()
    cv2.destroyAllWindows()

#Hilo separado para escuchar al server y no inundar la comunicacion 
def listen_server():
    context = zmq.Context()
    socket_sub = context.socket(zmq.SUB)
    socket_sub.connect(direccionGral)
    socket_sub.setsockopt_string(zmq.SUBSCRIBE, '')

    while True:
        message = socket_sub.recv_string()
        # Procesar el mensaje recibido
        print("Mensaje recibido:", message)

if __name__ == '__main__':
    # Crear hilos para la transmisión de video y escucha del servidor
    video_thread = threading.Thread(target=video_stream)
    server_thread = threading.Thread(target=listen_server)

    # Iniciar los hilos
    video_thread.start()
    server_thread.start()

    # Esperar a que los hilos terminen
    video_thread.join()
    server_thread.join()
