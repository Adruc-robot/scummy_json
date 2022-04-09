const data = new Promise((resolve, reject) => {
    fetch('scum-prices.json')
      .then(response => response.json())
      .then(data => whatIs(data))
      .catch(error => console.log(error));

})

function whatIs(obj,parentElem = null) {
  let testValue = Object.prototype.toString.call(obj)
  if (testValue === "[object Array]") {
    processArray(obj,parentElem) 
  } else if (testValue === "[object Object]") {
    //each object corresponds to a list - create the ul
    let objUL = document.createElement("ul")
    //if parentElem is null, append to body, else append to parentElem
    if (parentElem == null) {
      document.body.appendChild(objUL)
    } else {
      parentElem.appendChild(objUL)
    }
    //call processObject with objUL as a parameter
    processObject(obj, objUL)

  } else {
    //create a span for the value, stick it up in there, then append to parentElem
    let valSpan = document.createElement("span")
    valSpan.innerText = obj
    parentElem.appendChild(valSpan)
  }
}
function processArray(obj,parentElem = null) {
  for (let i = 0; i<obj.length; i++) {
    //I think each element of the array is going to consist of a an object, so 
    whatIs(obj[i], parentElem)
  }
}

function processObject(obj,parentElem) {
  /*for (let [key, value] of Object.entries(obj)) {
    //each key gets stuck in a span
    let tKey = document.createElement("span")
    tKey.innerText = key + ": "
    parentElem.appendChild(tKey)
    //create a span for the value - whatever it is
    let valSpan = document.createElement("span")
    parentElem.appendChild(valSpan)
    //call whatIs again, but use value and valSpan
    whatIs(value,valSpan)
  }*/
  for (let [key, value] of Object.entries(obj)) {
    //key/value pairs are stored in an li, so first make the li
    let objLI = document.createElement("li")
    //stick the key in a span
    let keySpan = document.createElement("span")
    keySpan.innerText = key + ": "
    objLI.appendChild(keySpan)
    parentElem.appendChild(objLI)
    //now call whatIs again, but use value and objLI as the parentelem
    whatIs(value, objLI)
  }
}


//console.log(obj)
function testing(obj) {
    //console.log("working")
    //console.log(JSON.stringify(obj))
    //console.log(obj.length)
    //console.log(obj)
    //let doot = JSON.parse(obj)
    //console.log("doot")
    //console.log(doot)
    //console.log(obj.limited-vehicles)
    //let tradeables = obj.limited-tradeables
  //console.log(obj["economy-override"])
  //let t1 = obj["economy-override"]
  //console.log(t1)
  //let t2 = t1["limited-tradeables"]
  //console.log(t2)
  //let t3 = t2["limited-vehicles"]
  //console.log(t3.length)
  //for (let i =0; i<t3.length; i++) {
    //console.log(t3[i])
  //}
  //console.log(obj["limited-vehicles"])
  for (const a in obj) {
    console.log(a, obj[a])
    for (const b in obj[a]) {
      console.log(b, obj[a][b])
      for (const c in obj[a][b]) {
        let doot = document.createElement("div")
        let tA = document.createElement("span")
        tA.innerText = "a: " + a + " "
        let tB = document.createElement("span")
        tA.innerText = "b: " + b + " "
        let tC = document.createElement("span")
        tA.innerText = "c: " + c + " "
        let tV = document.createElement("span")
        tV.innerText = "value: " + obj[a][b][c] + " "
        
        doot.appendChild(tA)
        doot.appendChild(tB)
        doot.appendChild(tC)
        doot.appendChild(tV)

        document.body.appendChild(doot)
        //console.log(c, obj[a][b][c])
      }
    }
  }
}

function iterate_over_json(obj) {
    for (let [key, value] of Object.entries(obj)) {
        console.log(key, value);
    }
    /*for (let key in obj) {
        let value = obj[key];
        console.log(`value ${value} and key ${key}`)
        if (obj.hasOwnProperty(key)) {
          console.log(`Property ${key} is NOT from prototype chain`);
        } else {
          console.log(`Property ${key} is from prototype chain`);
        }
      }*/
}