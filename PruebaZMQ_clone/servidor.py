from flask import Flask, render_template, Response, request, jsonify




#-----Setup---------#
direccion = "tcp://192.168.0.23:"
dir_host = "0.0.0.0"
puerto= "5005"
puerto2 = "5555"
puerto3 = "5556"
#------------------#

app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Login')
def index4():
    return render_template('login.html')


@app.route('/Registro')
def index3():
    return render_template('register.html')

@app.route('/Dashboard')
def index5():
    return render_template('Dashboard.html')


@app.route('/Workspace')
def index6():
    return render_template('Workspace.html')


@app.route('/video_feed')
def video_feed():
    return "video aqui"#Response(video_stream(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host=dir_host, port=puerto)
