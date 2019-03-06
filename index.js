'use strict';


const fetch = require('nyks/http/fetch');
const drain = require('nyks/stream/drain');

class RATP {
  constructor(){
    this.url = "https://api-ratp.pierre-grimaud.fr/v3";
  }

  async destinations(type, code, id){
    var dest_url = this.url + "/destinations"
    if(type)
      dest_url = dest_url + "/" + type;
    if(code)
      dest_url = dest_url + "/" + code;
    dest_url = dest_url + "?_format=json";
    if(id)
      dest_url = dest_url + "&id=" + id;
    var data = await this._fetch(dest_url);
    return data.destinations;
  }

  async lines(type, code, id){
    var dest_url = this.url + "/lines"
    if(type)
      dest_url = dest_url + "/" + type;
    if(code)
      dest_url = dest_url + "/" + code;
    dest_url = dest_url + "?_format=json";
    var data = await this._fetch(dest_url);
    if(id)
      dest_url = dest_url + "&id=" + id;
    if(type)
      data = data[type];
    return data;
  }

  async missions(code, mission, id) {
    var dest_url = this.url + "/missions"
    if(type)
      dest_url = dest_url + "/" + code;
    if(code)
      dest_url = dest_url + "/" + mission;
    dest_url = dest_url + "?_format=json";
    if(id)
      dest_url = dest_url + "&id=" + id;
    return this._fetch(dest_url);
  }

  async schedules(type, code, station, way, id) {
    if(!type || !code || !station || !way)
      throw `error params`
    var dest_url = this.url + "/schedules"
    if(type)
      dest_url = dest_url + "/" + type;
    if(code)
      dest_url = dest_url + "/" + code;
    if(station)
      dest_url = dest_url + "/" + station;
    if(way)
      dest_url = dest_url + "/" + way;
    dest_url = dest_url + "?_format=json";
    if(id)
      dest_url = dest_url + "&id=" + id;
    var data = await this._fetch(dest_url);
    return data.schedules;
  }

  async stations(type, code, id) {
    var dest_url = this.url + "/stations"
    if(type)
      dest_url = dest_url + "/" + type;
    if(code)
      dest_url = dest_url + "/" + code;
    dest_url = dest_url + "?_format=json";
    if(id)
      dest_url = dest_url + "&id=" + id;
    var data = await this._fetch(dest_url);
    return data.stations;
  }

  traffic(type, code) {
    var dest_url = this.url + "/traffic"
    if(type)
      dest_url = dest_url + "/" + type;
    if(code)
      dest_url = dest_url + "/" + code;
    dest_url = dest_url + "?_format=json";
    return this._fetch(dest_url);
  }

  async _fetch(dest_url){
    var res  = await fetch(dest_url);
    if(res.statusCode != 200)
      throw `invalide status code ${res.statusCode}`
    var data = JSON.parse(await drain(res));
    if(data.result && data.result.code == 400)
      throw data.message;
    return data.result;
  }

}

module.exports = RATP;