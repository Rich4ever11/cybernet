import nmap
import json
from flask import Flask, jsonify
from flask_cors import CORS
from flask import request, abort


app = Flask(__name__)
CORS(app)


def handlePortScanning(host, ports):
    nm = nmap.PortScanner()
    # ports="1-65535"
    nm.scan(hosts=host, ports=ports, arguments="-A -v")
    # print(nm.__dict__["_scan_result"])
    return jsonify(nm.__dict__["_scan_result"])


@app.route("/nmap", methods=["GET", "POST"])
def nmapScan():
    if request.method == "POST":
        data = request.get_json()
        print(data)
        host, ports = data["host"], data["ports"]
        # if host == "127.0.0.1" or host == "localhost":
        #     return jsonify(
        #         {
        #             "status": "failed",
        #             "data": {"message": "request denied"},
        #         }
        #     )
        return handlePortScanning(host, ports)
