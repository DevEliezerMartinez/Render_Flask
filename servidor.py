from flask import Flask, render_template, Response, request, jsonify
import zmq
import base64
import cv2

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/Workspace')
def index6():
    return render_template('Workspace.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
