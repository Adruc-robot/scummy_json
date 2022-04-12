let idCount = 1
const data = new Promise((resolve, reject) => {
    fetch('scum-prices.json')
      .then(response => response.json())
      .then(data => whatIs(data))
      .then(data => setUpListeners())
      .catch(error => console.log(error));

})

function setUpListeners () {
  setUpClickies()
  setUpSync()
}
function buildJson() {
  let JSONstring = ""
  let theHTML = document.getElementById("ulID1")
  for (let i = 0; i<theHTML.length; i++) {
    
  }
}

function setUpSync() {
  document.querySelectorAll(".syncItem").forEach((item) => {
    item.addEventListener("keyup", (event) => {
      //this is probably overly complex, but want to synchronize the values between the input and span
      //console.log(item.value)
      item.parentElement.parentElement.querySelectorAll(".valueSpan")[0].innerText = item.value
    })
  })
}

function setUpClickies() {
  document.querySelectorAll('.update').forEach((item) => {
    item.addEventListener('click', (event) => {
      updateValue(item)
    });
  });
  document.querySelectorAll('.destroy').forEach((item) => {
    item.addEventListener('click', (event) => {
      destroyEntry(item)
    });
  });
}

function updateValue(x) {
  if (x.classList.contains("on")) {
    x.classList.remove("on")
    x.classList.add("off")
    //need to remove hideItem from the span
    x.parentElement.parentElement.querySelectorAll(".valueSpan")[0].classList.remove("hideItem")
    //need to add hideItem to the inputItem
    x.parentElement.parentElement.querySelectorAll(".inputItem")[0].classList.add("hideItem")

  } else {
    x.classList.remove("off")
    x.classList.add("on")
    //need to add hideItem to the span
    x.parentElement.parentElement.querySelectorAll(".valueSpan")[0].classList.add("hideItem")
    //need to remove hideItem 
    x.parentElement.parentElement.querySelectorAll(".inputItem")[0].classList.remove("hideItem")
  }
}
function destroyEntry(x) {
  console.log(x)
}

function whatIs(obj,parentElem = null) {
  let testValue = Object.prototype.toString.call(obj)
  if (testValue === "[object Array]") {
    processArray(obj,parentElem) 
  } else if (testValue === "[object Object]") {
    //each object corresponds to a list - create the ul
    let objUL = document.createElement("ul")
    objUL.id = "ulID" + idCount
    idCount++
    //if parentElem is null, append to body, else append to parentElem
    if (parentElem == null) {
      document.body.appendChild(objUL)
    } else {
      parentElem.appendChild(objUL)
    }
    //call processObject with objUL as a parameter
    processObject(obj, objUL)

  } else {
    let valInput = document.createElement("input")
    valInput.setAttribute("type","text")
    valInput.setAttribute("value",obj)
    valInput.classList.add("hideItem","inputItem","syncItem")
    //create a span for the value, stick it up in there, then append to parentElem
    let valSpan = document.createElement("span")
    valSpan.innerText = obj
    valSpan.classList.add("valueSpan")
    parentElem.appendChild(valSpan)
    parentElem.appendChild(valInput)
    let pencilSpan = document.createElement("span")
    pencilSpan.innerHTML = '<i class="bi bi-pencil-square update off"></i>'
    parentElem.appendChild(pencilSpan)
    let trashSpan = document.createElement("span")
    trashSpan.innerHTML = '<i class="bi bi-trash3-fill destroy" style="color: red;"></i>'
    parentElem.appendChild(trashSpan)
  }
}
function processArray(obj,parentElem = null) {
  for (let i = 0; i<obj.length; i++) {
    //I think each element of the array is going to consist of a an object, so 
    whatIs(obj[i], parentElem)
  }
}

function processObject(obj,parentElem) {
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