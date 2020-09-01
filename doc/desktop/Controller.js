const Controller = function(eNode, callback) {
   let _nodeElement = document.querySelector(`[data-app="${ eNode }"]`)
    _nodeElement.id = eNode
    _nodeElement.className = `app-${ eNode }`
    callback(document.getElementById(eNode))
}

export default Controller