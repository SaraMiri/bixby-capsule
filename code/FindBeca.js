exports.tests = []
exports.preconditions = []
const allData = require("./lib/beca");
var dates = require("dates")
var lib = require("./lib/search_util.js");
exports.function = function(id, administracion, departamento, fechaDeRegistro, becaName, categoria) {
  var records = allData
  if (id) {
    records = records.filter(record => record.id && record.id == id)
  }
  if (administracion) {
    records = records.filter(record => record.administracion && record.administracion.toLowerCase().indexOf(administracion.toLowerCase()) >= 0)
  }
  if (departamento) {
    records = records.filter(record => record.departamento && record.departamento.toLowerCase().indexOf(departamento.toLowerCase()) >= 0)
  }
  if (fechaDeRegistro) {
    records = records.filter(record => record.fechaDeRegistro && record.fechaDeRegistro.toLowerCase().indexOf(fechaDeRegistro.toLowerCase()) >= 0)
  }
  if (becaName) {
    records = records.filter(record => record.becaName && record.becaName.toLowerCase().indexOf(becaName.toLowerCase()) >= 0)
  }
  if (categoria) {
    records = records.filter(record => record.categoria && record.becaName.toLowerCase().indexOf(categoria.toLowerCase()) >= 0)
  }
  return records
}