const headerString = "declaracionesPac/declaracion/requiereCertificadoSani,declaracionesPac/declaracion/muestras,declaracionesPac/declaracion/importada,declaracionesPac/declaracion/tipoConsumo,declaracionesPac/declaracion/tipoDeclaracion,declaracionesPac/declaracion/destino/pais,declaracionesPac/declaracion/bodegaOFrigorifico,declaracionesPac/declaracion/codigoEstablecimiento,declaracionesPac/declaracion/tipoEstablecimiento,declaracionesPac/declaracion/codigoProducto,declaracionesPac/declaracion/trazabilidades/traza/fechaElaboracion,declaracionesPac/declaracion/trazabilidades/traza/fechaVencimiento,declaracionesPac/declaracion/trazabilidades/traza/idLote,declaracionesPac/declaracion/trazabilidades/traza/origenMercancia,declaracionesPac/declaracion/trazabilidades/traza/region,declaracionesPac/declaracion/trazabilidades/traza/comuna,declaracionesPac/declaracion/trazabilidades/traza/centrosCultivo/codigoEstablecimiento,declaracionesPac/declaracion/trazabilidades/traza/fechaExtraccion,declaracionesPac/declaracion/trazabilidades/traza/pesoNeto,declaracionesPac/declaracion/trazabilidades/traza/jaula,declaracionesPac/declaracion/trazabilidades/traza/envase,declaracionesPac/declaracion/trazabilidades/traza/cantidadEnvases,declaracionesPac/declaracion/trazabilidades/traza/especies,declaracionesPac/declaracion/trazabilidades/traza/embarcaciones,declaracionesPac/declaracion/almacenamiento,declaracionesPac/declaracion/plantasFaenamiento/codigoEstablecimiento,declaracionesPac/declaracion/fechaFaenamiento,declaracionesPac";

const valuesString = "true,false,false,HUMANO,PECES DE CULTIVO,US,false,77777,PLANTA_ELABORADORA,23934,2020-06-10,2021-06-10,,ACUICULTURA,10,,100022,2020-06-08,3000,123,CAJAS DE CARTON,300,,,,10673,2020-06-09,http://www.w3.org/2001/XMLSchema-instance"

var doc = document.implementation.createDocument("", "", null);


const tagRecursive = (lista, value) => {
    let element = ''
    //console.log(value,'value')
    if (lista.length > 0) {
        element = doc.createElement(lista.pop())
        element.append(value)
        //console.log(element)
        //console.log(lista)
        return tagRecursive(lista, element)
    }
    else {
        return value
    }


}

let resp = tagRecursive(["declaracionesPac", "declaracion", "requiereCertificadoSani"], true)
//let resp1 = tagRecursive(["declaracionesPac", "declaracion", "muestras"], false)

const myTag = {
    tags: ["declaracionesPac", "declaracion", "muestras"],
    value:false
}


const joinTags2 = (dom, obj) => {
    
    if (obj.tags[0] != undefined && dom.tagName != undefined && dom.tagName != obj.tags[0]) {
        //nombres difererentes
        let nodos = [...dom.parentNode.children]
        let encontrado = nodos.find((node) => node.tagName === obj.tags[0])

        if (encontrado == undefined) {
            
            let new_tag = tagRecursive(obj.tags, obj.value)
            dom.parentNode.append(new_tag)
            
            return dom
        }
    }
    else if (dom.tagName == obj.tags[0]) {
        //nombres iguales
        if (dom.nodeType == 1) {
            obj.tags.shift();
            for (let index = 0; index < dom.childNodes.length; index++) {
                const element = dom.childNodes[index];
                joinTags2(element, obj)
            }
        }
    }
    return dom

}

joinTags2(resp, myTag)
console.log(resp, 'resp')
//primer join finalizado
const myTag2 = {
    tags: ["declaracionesPac", "declaracion", "importada"],
    value:true
}
joinTags2(resp, myTag2)
console.log(resp, 'resp')
//segundo join finalizado
const myTag3 = {
    tags: ["declaracionesPac", "declaracion", "destino", "pais"],
    value: "US"
}
joinTags2(resp, myTag3)
console.log(resp, 'resp')
//tercer join finalizado
const myTag4 = {
    tags: ["declaracionesPac", "declaracion", "trazabilidades", 'traza', 'fechaElaboracion'],
    value: "2020-06-10"
}
joinTags2(resp, myTag4)
console.log(resp, 'resp')
//CUARTO join finalizado

const myTag5 = {
    tags: ["declaracionesPac", "declaracion", "trazabilidades", 'traza', 'fechaVencimiento'],
    value: "2021-06-10"
}
joinTags2(resp, myTag5)
console.log(resp.innerHTML)

const myTag6 = {
    tags: ["declaracionesPac", "declaracion", "trazabilidades", 'traza', 'fechaExpiracion'],
    value: "2091-06-10"
}
joinTags2(resp, myTag6)
console.log(resp.innerHTML)

const myTag7 = {
    tags: ["declaracionesPac", "declaracion", "trazabilidades", 'traza', 'centrosCultivo', 'codigoEstablecimiento'],
    value: "19982332"
}
joinTags2(resp, myTag7)
console.log(resp.innerHTML)

const myTag8 = {
    tags: ["declaracionesPac", "declaracion", "plantasFaenamiento", 'codigoEstablecimiento'],
    value: "765"
}
joinTags2(resp, myTag8)
console.log(resp.innerHTML)

const myTag9 = {
    tags: ["declaracionesPac", "declaracion", "fechaFaenamiento"],
    value: "2021-06-12"
}
let result = joinTags2(resp, myTag9)
console.log(resp.innerHTML)
console.log(result)

const myTag10 = {
    tags: ["declaracionesPac", "declaracion", "trazabilidades", 'traza', 'idLote'],
    value: "***"
}
result = joinTags2(resp, myTag10)
console.log(result.outerHTML)