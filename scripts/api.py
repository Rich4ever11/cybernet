import nmap
import json
from flask import Flask, jsonify
from flask_cors import CORS
from flask import request, abort
from shodan import Shodan
from pathlib import Path


app = Flask(__name__)
CORS(app)


def getShodanAPIKey():
    with open("../.env") as env_variables:
        for env in env_variables.readlines():
            if env.split("=")[0] == "SHODAN_API":
                return env.split("=")[1].replace("\n", "")
    return ""


SHODAN_API_KEY = Shodan(key=str(getShodanAPIKey()))


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
        host, ports = data["host"], data["ports"]
        if host == "127.0.0.1" or host == "localhost":
            return jsonify(
                {
                    "status": "failed",
                    "data": {"message": "request denied"},
                }
            )
        return handlePortScanning(host, ports)


@app.route("/shodan", methods=["POST"])
def shodanExploitSearch():
    if request.method == "POST":
        data = request.get_json()
        search_query = data["searchQuery"]
        print(search_query)
        result = SHODAN_API_KEY.exploits.search(query=search_query)
        return jsonify(result)
